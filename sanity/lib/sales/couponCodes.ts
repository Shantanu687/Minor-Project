export const COUPON_CODES = {
    FESTIVAL: 'FESTIVAL',
    SUMMER: 'summer',
    WINTER: 'winter',
    BIRTHDAY: 'birthday',
} as const;

export type CouponCode = keyof typeof COUPON_CODES;