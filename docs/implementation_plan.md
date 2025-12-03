# Implementation Plan: Payment Gateway & Guest Checkout

## Overview

This plan implements two major features:
1. **Payment Gateway Integration**: Add Stripe and PayPal as payment options with a real payment flow
2. **Guest Checkout**: Allow non-authenticated users to proceed through the booking process including seat selection

## User Review Required

> [!IMPORTANT]
> **Payment Gateway Choice**: This implementation will use **demo/test mode** for both Stripe and PayPal. For production use, you'll need to:
> - Obtain API keys from Stripe and/or PayPal
> - Configure webhook endpoints for payment confirmations
> - Set up proper backend integration for secure payment processing
>
> The current implementation will simulate payment processing using mock integrations suitable for demonstration purposes.

> [!WARNING]
> **Security Considerations**: Guest checkout stores passenger information in localStorage for demo purposes. In production, this should:
> - Be stored in a secure backend database
> - Use proper session management
> - Implement CSRF protection
> - Validate all user inputs server-side

## Proposed Changes

### Authentication & Guest Flow

#### [MODIFY] [AuthContext.tsx](file:///d:/airgate1/src/contexts/AuthContext.tsx)

Add support for guest sessions:
- Add `isGuest` flag to track guest users
- Add `setGuestMode()` function to enable guest checkout
- Persist guest session data in localStorage

#### [MODIFY] [FlightCard.tsx](file:///d:/airgate1/src/components/FlightCard.tsx)

Remove authentication requirement:
- Allow all users (authenticated and guest) to proceed to checkout
- Set guest mode when non-authenticated user clicks "Seleccionar vuelo"

---

### Checkout Flow Enhancements

#### [MODIFY] [Checkout.tsx](file:///d:/airgate1/src/pages/Checkout.tsx)

Update to support guest users:
- Show additional guest information form when `user === null`
- Collect guest email/name for booking confirmation
- Keep existing seat selection for both user types
- Remove redirect to login page

#### [NEW] [Payment.tsx](file:///d:/airgate1/src/pages/Payment.tsx)

New payment processing page:
- Display booking summary
- Payment method selection (Stripe, PayPal, Credit Card)
- Payment form based on selected method
- Process payment and navigate to confirmation
- Handle payment errors with user-friendly messages

---

### Payment Components

#### [NEW] [PaymentMethodSelector.tsx](file:///d:/airgate1/src/components/PaymentMethodSelector.tsx)

Payment method selection component:
- Visual cards for Stripe, PayPal, and Credit Card options
- Active state indication
- Payment provider logos

#### [NEW] [StripePaymentForm.tsx](file:///d:/airgate1/src/components/StripePaymentForm.tsx)

Stripe payment form:
- Card number, expiry, CVV inputs with validation
- Stripe-style UI design
- Form validation and error handling
- Mock payment processing for demo

#### [NEW] [PayPalButton.tsx](file:///d:/airgate1/src/components/PayPalButton.tsx)

PayPal integration button:
- PayPal-branded button
- Mock PayPal payment flow
- Success/error handling

#### [NEW] [CreditCardForm.tsx](file:///d:/airgate1/src/components/CreditCardForm.tsx)

Generic credit card payment form:
- Standard card input fields
- Card type detection (Visa, Mastercard, etc.)
- Input validation
- Mock processing

---

### Route Updates

#### [MODIFY] [App.tsx](file:///d:/airgate1/src/App.tsx)

Add new payment route:
- Add route for `/payment` page
- Route should be accessible to both authenticated and guest users

---

### Confirmation Updates

#### [MODIFY] [Confirmation.tsx](file:///d:/airgate1/src/pages/Confirmation.tsx)

Update to show payment information:
- Display payment method used
- Show transaction ID (mock)
- Display guest user information if applicable
- Show payment receipt details

## Verification Plan

### Automated Tests

Not applicable for this demo project - tests would require backend API integration.

### Manual Verification

1. **Guest User Flow**:
   - Open application without logging in
   - Search for flights and select one
   - Verify checkout page loads with guest information form
   - Select a seat on the seat map
   - Fill in all passenger details
   - Proceed to payment

2. **Payment Gateway Testing**:
   - Test Stripe mock payment (should succeed)
   - Test PayPal mock payment (should succeed)
   - Test credit card form with validation
   - Verify payment confirmation shows correct details

3. **Authenticated User Flow**:
   - Login as registered user
   - Complete booking process
   - Verify pre-filled user information
   - Complete payment
   - Verify confirmation page

4. **Browser Testing**:
   - Test the complete flow in the browser
   - Verify all forms function correctly
   - Check responsive design on mobile layout
   - Validate error states and loading indicators
