import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock agents data
    const agents = [
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

    return NextResponse.json({
      data: agents,
      message: "Agents fetched successfully"
    });
  } catch (error) {
    console.error('Error in agents API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
