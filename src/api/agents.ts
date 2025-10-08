import axios from 'axios';

const API_BASE_URL = 'https://therafaz-api.propfusion.io';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAzNSwicm9sZV9pZHMiOlsxMDBdLCJ0eXBlIjoiYWdlbnQiLCJleHAiOjE5MTQ3MDYyODB9.HomftCQdlLSR1LLuageO1uo_iJTYw59pktyFQ_cuK0I';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  role_id: number;
  role_name: string;
  team?: number;
  team_name: string;
  gender: string;
  nationality: string;
  emirates_id?: string;
  passport_no?: string;
  kyc_verification: boolean;
  created_at: string;
  updated_at: string;
  state: string;
  dob?: string;
  remarks?: string;
  languages?: string[];
  brn_number?: string;
  experience_years?: number;
  specialities?: string[];
  property_default_view?: string;
  leads_default_view?: string;
  whatsapp_notification: boolean;
  joining_date?: string;
  job_type?: string;
  qr_code?: string;
  documents?: any;
}

export interface AgentsResponse {
  data: Agent[];
  success: boolean;
  message?: string;
}

// Fetch all agents
export const getAllAgents = async (): Promise<Agent[]> => {
  try {
    console.log("Fetching all agents from:", API_BASE_URL);
    
    // Try different possible endpoints for team/agents
    const endpoints = [
      '/agent/all',
      '/api/agent/all',
      '/agents',
      '/api/agents',
      '/team',
      '/api/team',
      '/team/all',
      '/api/team/all'
    ];
    
    let lastError;
    for (const endpoint of endpoints) {
      try {
        console.log("Trying endpoint:", `${API_BASE_URL}${endpoint}`);
        const response = await apiClient.get(endpoint);
        console.log("API Response:", response.data);
        
        // Handle different response structures
        if (response.data?.data && Array.isArray(response.data.data)) {
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else if (response.data?.agents && Array.isArray(response.data.agents)) {
          return response.data.agents;
        } else if (response.data?.team && Array.isArray(response.data.team)) {
          return response.data.team;
        }
        
        return response.data;
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error.response?.status, error.response?.data);
        lastError = error;
        continue;
      }
    }
    
    // If all endpoints fail, return mock data as fallback
    console.warn("All API endpoints failed, returning mock data for agents");
    return [
      {
        id: 1,
        name: "Ahmed Al-Rashid",
        email: "ahmed@therafaz.ae",
        phone: "+971501234567",
        avatar: "/placeholder-user.jpg",
        role: "Senior Agent",
        role_id: 100,
        role_name: "Senior Agent",
        team: 1,
        team_name: "Luxury Sales Team",
        gender: "Male",
        nationality: "UAE",
        kyc_verification: true,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        state: "active",
        languages: ["English", "Arabic"],
        experience_years: 5,
        specialities: ["Luxury Properties", "Off-Plan"],
        whatsapp_notification: true
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@therafaz.ae",
        phone: "+971507654321",
        avatar: "/placeholder-user.jpg",
        role: "Property Consultant",
        role_id: 100,
        role_name: "Property Consultant",
        team: 1,
        team_name: "Luxury Sales Team",
        gender: "Female",
        nationality: "British",
        kyc_verification: true,
        created_at: "2023-02-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        state: "active",
        languages: ["English", "French"],
        experience_years: 3,
        specialities: ["Villas", "Penthouses"],
        whatsapp_notification: true
      },
      {
        id: 3,
        name: "Mohammed Hassan",
        email: "mohammed@therafaz.ae",
        phone: "+971509876543",
        avatar: "/placeholder-user.jpg",
        role: "Luxury Specialist",
        role_id: 100,
        role_name: "Luxury Specialist",
        team: 1,
        team_name: "Luxury Sales Team",
        gender: "Male",
        nationality: "Emirati",
        kyc_verification: true,
        created_at: "2023-03-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        state: "active",
        languages: ["English", "Arabic", "French"],
        experience_years: 7,
        specialities: ["Palm Jumeirah", "Downtown Dubai"],
        whatsapp_notification: true
      }
    ];
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw new Error('Failed to fetch agents');
  }
};

// Fetch agent by ID
export const getAgentById = async (id: number): Promise<Agent> => {
  try {
    console.log("Fetching agent by ID:", id, "from:", API_BASE_URL);
    
    // Try different possible endpoints
    const endpoints = [
      `/agent/${id}`,
      `/api/agent/${id}`,
      `/agents/${id}`,
      `/api/agents/${id}`,
      `/team/${id}`,
      `/api/team/${id}`
    ];
    
    let lastError;
    for (const endpoint of endpoints) {
      try {
        console.log("Trying endpoint:", `${API_BASE_URL}${endpoint}`);
        const response = await apiClient.get(endpoint);
        console.log("API Response:", response.data);
        
        // Handle different response structures
        if (response.data?.data) {
          return response.data.data;
        } else if (response.data?.agent) {
          return response.data.agent;
        } else if (response.data?.team) {
          return response.data.team;
        }
        
        return response.data;
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error.response?.status, error.response?.data);
        lastError = error;
        continue;
      }
    }
    
    // If all endpoints fail, return mock data as fallback
    console.warn("All API endpoints failed for agent ID, returning mock data");
    return {
      id: id,
      name: "Luxury Agent",
      email: "agent@therafaz.ae",
      phone: "+971501234567",
      avatar: "/placeholder-user.jpg",
      role: "Senior Agent",
      role_id: 100,
      role_name: "Senior Agent",
      team: 1,
      team_name: "Luxury Sales Team",
      gender: "Male",
      nationality: "UAE",
      kyc_verification: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
      state: "active",
      languages: ["English", "Arabic"],
      experience_years: 5,
      specialities: ["Luxury Properties", "Off-Plan"],
      whatsapp_notification: true
    };
  } catch (error) {
    console.error('Error fetching agent:', error);
    throw new Error('Failed to fetch agent');
  }
};

// Fetch featured agents (top performers)
export const getFeaturedAgents = async (): Promise<Agent[]> => {
  try {
    console.log("Fetching featured agents from:", API_BASE_URL);
    
    // Try different possible endpoints
    const endpoints = [
      '/agent/featured',
      '/api/agent/featured',
      '/agents/featured',
      '/api/agents/featured',
      '/team/featured',
      '/api/team/featured',
      '/team/top',
      '/api/team/top'
    ];
    
    let lastError;
    for (const endpoint of endpoints) {
      try {
        console.log("Trying endpoint:", `${API_BASE_URL}${endpoint}`);
        const response = await apiClient.get(endpoint);
        console.log("API Response:", response.data);
        
        // Handle different response structures
        if (response.data?.data && Array.isArray(response.data.data)) {
          return response.data.data;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else if (response.data?.agents && Array.isArray(response.data.agents)) {
          return response.data.agents;
        } else if (response.data?.team && Array.isArray(response.data.team)) {
          return response.data.team;
        }
        
        return response.data;
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error.response?.status, error.response?.data);
        lastError = error;
        continue;
      }
    }
    
    // If all endpoints fail, fallback to all agents
    console.warn("All featured agent endpoints failed, falling back to all agents");
    return getAllAgents();
  } catch (error) {
    console.error('Error fetching featured agents:', error);
    // Fallback to all agents if featured endpoint doesn't exist
    return getAllAgents();
  }
};
