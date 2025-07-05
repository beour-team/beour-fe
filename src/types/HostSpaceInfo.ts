export interface HostSpaceInfo {
    host_Id: number;
    name: string;
    space_category: "CAFE" | "RESTAURANT" | "COOKING" | "LEATHER" | "COSTUME" | "ART";
    use_category: "MEETING" | "COOKING" | "BARISTA" | "FLEA_MARKET" | "FILMING" | "ETC";
    max_capacity: number;
  
    address: string;
    detail_address: string;
    price_per_hour: number;
    thumbnail_url: string;
  
    description: {
      description: string;
      price_guide: string;
      facility_notice: string;
      notice: string;
      location_description: string;
      refund_policy: string;
      website_url: string;
    };
  
    tags: string[];
  
    availableTimes: {
      date: string;         // e.g., "2025-07-04"
      start_time: string;    // e.g., "10:00"
      endend_timeTime: string;      // e.g., "18:00"
    }[];
  
    spaceImages: {
      image_url: string[];  // 썸네일 이미지 URL 
    }
  }
  