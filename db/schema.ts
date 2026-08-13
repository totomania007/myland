import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// 1. Properties Table (Includes Mortgage & Loan Financial Fields)
export const properties = sqliteTable('properties', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(), // e.g. "Sunset Heights Condo"
  address: text('address').notNull(),
  
  // Mortgage & Financial Tracking Fields
  totalPrincipal: real('total_principal').notNull().default(0),    // ยอดกู้รวม (THB)
  monthlyInstallment: real('monthly_installment').notNull().default(0), // ยอดผ่อนต่อเดือน (THB)
  interestRate: real('interest_rate').notNull().default(0),        // ดอกเบี้ยธนาคาร (% ต่อปี)
  loanStartDate: text('loan_start_date').notNull(),                // วันที่เริ่มผ่อน (YYYY-MM-DD)
  
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// 2. Units Table (Individual Rental Rooms / Units)
export const units = sqliteTable('units', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  propertyId: text('property_id')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  unitNumber: text('unit_number').notNull(), // e.g. "401/12"
  floor: integer('floor').default(1),
  rentPrice: real('rent_price').notNull().default(0), // ราคาเช่าต่อเดือน (THB)
  status: text('status', { enum: ['vacant', 'occupied', 'maintenance'] })
    .notNull()
    .default('vacant'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// 3. Tenants Table (Linked to Clerk Authentication)
export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  clerkUserId: text('clerk_user_id').notNull().unique(), // Linked to Clerk Auth User ID
  fullName: text('full_name').notNull(),
  idCardNumber: text('id_card_number').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  idCardImageUrl: text('id_card_image_url'), // Cloudinary URL for ID card scan
  pdpaConsented: integer('pdpa_consented', { mode: 'boolean' }).notNull().default(false),
  pdpaConsentedAt: text('pdpa_consented_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// 4. Contracts Table (Lease Agreements)
export const contracts = sqliteTable('contracts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  unitId: text('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'cascade' }),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  startDate: text('start_date').notNull(), // YYYY-MM-DD
  endDate: text('end_date').notNull(),     // YYYY-MM-DD
  monthlyRent: real('monthly_rent').notNull(), // ค่าเช่าสุทธิต่อเดือน
  securityDeposit: real('security_deposit').notNull(), // เงินประกัน
  advanceRent: real('advance_rent').notNull().default(0), // ค่าเช่าล่วงหน้า
  termsText: text('terms_text'), // ข้อตกลงเพิ่มเติม
  status: text('status', { enum: ['active', 'expired', 'terminated'] })
    .notNull()
    .default('active'),
  lessorName: text('lessor_name').notNull().default('บริษัท พรอพเพอร์ตี้ แมเนจเม้นท์ จำกัด'),
  lessorIdCard: text('lessor_id_card').default('1-1004-99999-99-9'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// TypeScript Types
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;
export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
export type Contract = typeof contracts.$inferSelect;
export type NewContract = typeof contracts.$inferInsert;
