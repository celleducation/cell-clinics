import {NextRequest, NextResponse} from "next/server";

type NominatimResult = {
  lat: string;
  lon: string;
};

const allowedCountries = new Set(["DE", "AT", "CH", "ES"]);

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  const requestedCountry = request.nextUrl.searchParams.get("country")?.toUpperCase();

  if (!query || query.length < 2 || query.length > 120) {
    return NextResponse.json({location: null}, {status: 400});
  }

  const countryCodes = requestedCountry && allowedCountries.has(requestedCountry)
    ? requestedCountry.toLowerCase()
    : "de,at,ch,es";
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "1",
    countrycodes: countryCodes,
    addressdetails: "0"
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: {
        "Accept-Language": request.headers.get("accept-language") || "de,en;q=0.8",
        "User-Agent": "Cell Clinics Partner Finder (info@cell-education.com)"
      },
      next: {revalidate: 86400}
    });

    if (!response.ok) {
      return NextResponse.json({location: null}, {status: 502});
    }

    const [result] = await response.json() as NominatimResult[];
    if (!result) return NextResponse.json({location: null});

    return NextResponse.json({
      location: {lat: Number(result.lat), lng: Number(result.lon)}
    });
  } catch {
    return NextResponse.json({location: null}, {status: 502});
  }
}
