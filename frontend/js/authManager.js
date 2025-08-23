let SUPER_ADMIN_KEY = '';

export function getSuperAdminKey() {
  if (!SUPER_ADMIN_KEY) {
    SUPER_ADMIN_KEY = prompt("Enter your Super Admin Key:");
  }
  return SUPER_ADMIN_KEY;
}