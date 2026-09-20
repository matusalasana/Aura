
export const getSubdomain = (hostname: string) => {

  console.log(hostname)
  const parts = hostname.split(".");

  if (parts.length < 3) {
    throw new Error ("Store could not be determined")
  }
  
  if (hostname.endsWith(".aura.com")) {
    return parts[0];
  }

  return null;
};