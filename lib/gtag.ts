export const GA_TRACKING_ID = "G-DY9K928ZNX"; // Replace with your GA4 ID

// Track page views
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
  console.log("pageview", url);  
};

export const event = ({
    action,
    category,
    label,
    value,
  }: {
    action: string;
    category: string;
    label: string;
    value: number;
  }) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };