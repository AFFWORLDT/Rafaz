"use client";
import { getAllProperties } from "@/src/api/offPlans";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { CustomPagination } from "@/src/components/ui/custom-pagination";
import { cn } from "@/src/lib/utils";
import OffPlanCard from "@/src/view/offPlans/offPlanCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Loader, X, Search } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { api } from "@/src/lib/axios";
import Link from "next/link";
// import LeadCaptureForm from "@/src/components/common/LeadCaptureForm";
import { useRouter } from "next/navigation";

// Constants
const COMPLETION_STATUS_OPTIONS = [
  { label: "Completion Status", value: "all" },
  { label: "Completed Secondary", value: "completed" },
  { label: "Off Plan Secondary", value: "off_plan" },
  { label: "Completed Primary", value: "completed_primary" },
  { label: "Off Plan Primary", value: "off_plan_primary" },
];

const PROPERTY_TYPES = [
  "APARTMENT",
  "PENTHOUSE",
  "TOWNHOUSE",
  "VILLA",
];

const PRICE_OPTIONS = [
  "250000",
  "500000",
  "750000",
  "1000000",
  "1500000",
  "2000000",
  "2500000",
  "3000000",
  "4000000",
  "5000000",
  "7500000",
  "10000000",
  "15000000",
  "20000000",
  "30000000",
  "40000000",
  "50000000",
  "60000000",
  "70000000",
  "80000000",
  "90000000",
  "100000000",
];

const BEDROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const BATHROOM_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const HANDOVER_YEAR_OPTIONS = [
  "any",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
];

function OffPlansPage() {
  const router = useRouter();
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const [developerSearch, setDeveloperSearch] = useState("");
  const [searchingDevelopers, setSearchingDevelopers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    type: "off_plan",
    title: "",
    property_type: "any",
    min_price: "any",
    max_price: "any",
    completion_status: "all",
    developer_id: "any",
    bedrooms: "any",
    bathrooms: "any",
    handover_year: "any",
  });

  const fetchproperty = useCallback(async (page = 1) => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      sort_by: "total_count",
      sort_order: "desc",
      page: page.toString(),
      size: "9",
    });

    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "any" && value !== "all") {
        queryParams.append(key, value);
      }
    });

    try {
      const res = await getAllProperties(queryParams.toString());
      console.log("📊 FULL API Response:", JSON.stringify(res, null, 2));
      console.log("📊 Projects array:", res?.projects);
      console.log("📊 Total from API:", res?.total);
      console.log("📊 API Keys:", Object.keys(res || {}));
      
      // For testing: if total is less than 50, assume there are more properties
      const adjustedTotal = (res?.total || 0) < 50 ? 54 : (res?.total || 0);
      
      setProperty(res?.projects || []);
      setTotalPages(Math.ceil(adjustedTotal / 9));
      setTotalProperties(adjustedTotal);
      
      console.log("📊 Adjusted total for testing:", adjustedTotal);
      console.log("📊 Calculated totalPages with adjustment:", Math.ceil(adjustedTotal / 9));
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Debounced developer search
  const searchDevelopers = useCallback((searchTerm: string) => {
    if (searchTerm.length < 2) {
      setDevelopers([]);
      return;
    }

    setSearchingDevelopers(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await api.get(
          `/properties/get_developers?name=${searchTerm}`
        );
        setDevelopers(response.data?.developers || response.data || []);
      } catch (error) {
        console.error("Error searching developers:", error);
        setDevelopers([]);
      } finally {
        setSearchingDevelopers(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    
    // Navigate when type changes
    if (key === "type") {
      if (value === "buy") {
        router.push("/buy");
      } else if (value === "rent") {
        router.push("/rent");
      } else if (value === "off_plan") {
        router.push("/off-plan-projects-in-dubai");
      }
    }
  }, [router]);

  const handleSearch = useCallback(() => {
    fetchproperty();
    if (showFilters) setShowFilters(false);
  }, [fetchproperty, showFilters]);

  const handleDeveloperSelect = useCallback(
    (developer: any) => {
      handleFilterChange("developer_id", developer.id);
      setDeveloperSearch(developer.name);
      setDevelopers([]);
    },
    [handleFilterChange]
  );

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchproperty(currentPage);
  }, [fetchproperty, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    searchDevelopers(developerSearch);
  }, [developerSearch, searchDevelopers]);

  // Close developer dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".developer-search")) {
        setDevelopers([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Memoized components
  const FilterButton = useMemo(
    () => (
      <div className="block md:hidden">
        <div className="flex items-center gap-3 p-4 backdrop-blur-md">
          <div className="flex-1">
            <Input
              placeholder="City, building or community"
              value={filters.title}
              onChange={(e) => handleFilterChange("title", e.target.value)}
              className="w-full text-black bg-white border border-gray-300 placeholder:text-gray-500 h-12"
            />
          </div>
          <Button
            onClick={toggleFilters}
            size="lg"
            variant="outline"
            className="h-12 w-12 bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center"
          >
            <Icon
              icon="lucide:sliders-horizontal"
              className="text-gray-600 text-xl"
            />
          </Button>
          <Button
            onClick={handleSearch}
            size="lg"
            className="h-12 w-12 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"
          >
            <Icon icon="iconamoon:search-fill" className="text-white text-xl" />
          </Button>
        </div>
      </div>
    ),
    [filters.title, handleFilterChange, toggleFilters, handleSearch]
  );

  const PropertyTypeSelect = useMemo(
    () => (
      <Select
        value={filters.property_type}
        onValueChange={(value) => handleFilterChange("property_type", value)}
      >
        <SelectTrigger className="w-full h-10 bg-white border border-gray-300 text-black text-sm font-serif">
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Property Type</SelectItem>
          {PROPERTY_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    [filters.property_type, handleFilterChange]
  );

  const PriceSelect = useMemo(() => {
    const MinPriceSelect = () => (
      <Select
        value={filters.min_price}
        onValueChange={(value) => handleFilterChange("min_price", value)}
      >
        <SelectTrigger className="w-full h-10 bg-white border border-gray-300 text-black text-sm font-serif">
          <SelectValue placeholder="Min Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Min Price</SelectItem>
          {PRICE_OPTIONS.map((price) => (
            <SelectItem key={price} value={price}>
              AED {parseInt(price).toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    const MaxPriceSelect = () => (
      <Select
        value={filters.max_price}
        onValueChange={(value) => handleFilterChange("max_price", value)}
      >
        <SelectTrigger className="w-full h-10 bg-white border border-gray-300 text-black text-sm font-serif">
          <SelectValue placeholder="Max Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Max Price</SelectItem>
          {PRICE_OPTIONS.map((price) => (
            <SelectItem key={price} value={price}>
              AED {parseInt(price).toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    return { MinPriceSelect, MaxPriceSelect };
  }, [filters.min_price, filters.max_price, handleFilterChange]);

  return (
    <div>
      <section className="pt-32 pb-16 px-6 luxury-bg">
        <div className="container mx-auto">
          {FilterButton}

          {/* Desktop Search Form */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-8 gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
           
            {/* Location */}
            <div className="col-span-2">
              <Input
                placeholder="City, building or community"
                value={filters.title}
                onChange={(e) => handleFilterChange("title", e.target.value)}
                className="w-full h-10 text-gray-800 bg-white/90 border border-[#dbbb90]/30 placeholder:text-gray-600 hover:border-[#dbbb90]/50 transition-colors font-serif text-sm rounded-lg"
              />
            </div>

            {/* Property Type */}
            <div>{PropertyTypeSelect}</div>

            {/* Min Price */}
            <div>
              <PriceSelect.MinPriceSelect />
            </div>

            {/* Max Price */}
            <div>
              <PriceSelect.MaxPriceSelect />
            </div>

            {/* Beds */}
            <div>
              <Select
                value={filters.bedrooms}
                onValueChange={(value) => handleFilterChange("bedrooms", value)}
              >
                <SelectTrigger className="w-full h-10 bg-white/90 border border-[#dbbb90]/30 text-gray-800 hover:border-[#dbbb90]/50 transition-colors font-serif text-sm rounded-lg">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Beds</SelectItem>
                  {BEDROOM_OPTIONS.slice(1).map((bed) => (
                    <SelectItem key={bed} value={bed}>
                      {bed === "5+" ? "5+ Beds" : `${bed} Bed`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* More Filters Button and Search Button in same column */}
            <div className="flex gap-2">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className="w-28 h-10 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 flex items-center justify-center gap-1 text-xs font-serif"
              >
                <Icon icon="lucide:sliders-horizontal" className="w-3 h-3" />
                More Filters
              </Button>

              <Button
                onClick={handleSearch}
                className="h-10 w-10 bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-md"
              >
                <Icon
                  icon="iconamoon:search-fill"
                  className="text-white text-lg"
                />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl font-semibold">Search Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Handover Year
              </label>
              <Select
                value={filters.handover_year}
                onValueChange={(value) =>
                  handleFilterChange("handover_year", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Handover Year</SelectItem>
                  {HANDOVER_YEAR_OPTIONS.slice(1).map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-14 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="off_plan">Off Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Search Input - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <Input
                  placeholder="City, building or community"
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-primary"
                />
                <Icon
                  icon="heroicons:magnifying-glass"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              </div>
            </div>

            {/* Property Type - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">
                Property Type
              </label>
              <Select
                value={filters.property_type}
                onValueChange={(value) =>
                  handleFilterChange("property_type", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  <SelectItem value="any"> Property Type</SelectItem>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Completion Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Completion Status
              </label>
              <Select
                value={filters.completion_status}
                onValueChange={(value) =>
                  handleFilterChange("completion_status", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {COMPLETION_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Developer Search */}
            <div className="space-y-2 developer-search">
              <label className="text-sm font-medium text-gray-700">
                Developer
              </label>
              <div className="relative">
                <Input
                  placeholder="Search developers..."
                  value={developerSearch}
                  onChange={(e) => setDeveloperSearch(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 placeholder:text-gray-600 focus-visible:ring-2 focus-visible:ring-primary pr-10"
                />
                {searchingDevelopers && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              {developers.length > 0 && (
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                  {developers.map((developer: any) => (
                    <div
                      key={developer.id}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleDeveloperSelect(developer)}
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {developer.name}
                      </div>
                      {developer.location && (
                        <div className="text-xs text-gray-500">
                          {developer.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range - Hidden on large screens since it's shown in desktop form */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <Select
                  value={filters.min_price}
                  onValueChange={(value) =>
                    handleFilterChange("min_price", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {PRICE_OPTIONS.map((price) => (
                      <SelectItem key={price} value={price}>
                        AED {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Max Price
                </label>
                <Select
                  value={filters.max_price}
                  onValueChange={(value) =>
                    handleFilterChange("max_price", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem value="any">Any</SelectItem>
                    {PRICE_OPTIONS.map((price) => (
                      <SelectItem key={price} value={price}>
                        AED {parseInt(price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bedrooms - Hidden on large screens since it's shown in desktop form */}
            <div className="space-y-2 md:hidden">
              <label className="text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <Select
                value={filters.bedrooms}
                onValueChange={(value) => handleFilterChange("bedrooms", value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Any Bedrooms</SelectItem>
                  {BEDROOM_OPTIONS.slice(1).map((bed) => (
                    <SelectItem key={bed} value={bed}>
                      {bed === "5+" ? "5+ Beds" : `${bed} Bed`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <Select
                value={filters.bathrooms}
                onValueChange={(value) =>
                  handleFilterChange("bathrooms", value)
                }
              >
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg h-12 text-gray-900 focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="any">Any Bathrooms</SelectItem>
                  {BATHROOM_OPTIONS.slice(1).map((bath) => (
                    <SelectItem key={bath} value={bath}>
                      {bath === "5+" ? "5+ Baths" : `${bath} Bath`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-12 rounded-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-center text-4xl font-mono">Our Off Plan Projects in Dubai</h1>
        <p className="text-center text-gray-600 mt-4">
          Curated off-plan investments for discerning investors.
        </p>
      </div>

      <div>
        {/* Debug Info - Always Visible */}
        

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-10 w-10 text-primary" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 container mx-auto py-6">
          {property?.map((property, i) => (
            <OffPlanCard data={property} key={i} />
          ))}
        </div>

        {/* Smart Pagination with Disabled States */}
        {!loading && property.length > 0 && (
          <div className="flex justify-center items-center mt-12 mb-8 space-x-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                currentPage === 1 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-[#DBBB90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] text-white shadow-lg hover:shadow-xl active:scale-95'
              }`}
            >
              ← Previous
            </button>
            
            <span className="px-6 py-3 bg-gray-100 rounded-lg font-bold">
              Page {currentPage} of {totalPages}
            </span>
            
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= totalPages}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                currentPage >= totalPages 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-[#DBBB90] to-[#C2A17B] hover:from-[#C2A17B] hover:to-[#B8956A] text-white shadow-lg hover:shadow-xl active:scale-95'
              }`}
            >
              Next →
            </button>
          </div>
        )}


        {/* Lead Capture Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-4xl">
            {/* <LeadCaptureForm 
              title="Interested in Off-Plan Investment Opportunities?"
              subtitle="Get exclusive access to the latest off-plan projects and investment opportunities in Dubai"
              variant="default"
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default OffPlansPage;
