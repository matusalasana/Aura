Auth
1. user registration
2. user login
3. user logout
4. role check is from db, not from jwt to prevent stale role problem

Vendor
1. Apply for become vendor (create vendor)
2. Change the customer role to vendor when approved
3. vendor can create, edit, and delete products

products
1. each product has its owner(vendor)
2. are either published or draft - draft ones are visible only for vendor.
3. 