import { Button } from "./ui/button";
import { ShoppingBag, CreditCard, Check, Euro } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { client } from "../utils/client";
import { track } from "../lib/analytics";
import { FormEvent, useEffect, useState } from "react";
import { Appearance, loadStripe, StripeElementsOptions, StripePaymentElementOptions, Stripe } from "@stripe/stripe-js";


interface PurchaseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onError?: (error: Error) => void;
}

// Internal payment form component
function PaymentForm({ onClose }: { onClose: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    track("Payment Succeeded", { location: "PurchaseModal" });
                    setTimeout(onClose, 2000); // Close modal after success
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                case undefined:
                    setMessage("");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, onClose]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_BASE_URL}/thank-you`,
            },
        });

        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error.message ?? "");
        } else if (error) {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs",
    };

    return (
        <div className="space-y-4">
            <div className="text-center text-lg font-semibold">
                Cena: €29.99
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement options={paymentElementOptions} />
                <Button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    className="w-full"
                >
                    {isLoading ? "Apstrādā..." : "Maksāt tagad"}
                </Button>
                {message && (
                    <div className={`text-center text-sm ${
                        message.includes("succeeded") ? "text-green-600" : "text-destructive"
                    }`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

export function PurchaseModal({ open, onOpenChange, onError }: PurchaseModalProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [stripeLoading, setStripeLoading] = useState(true);
    const [paymentError, setPaymentError] = useState<Error | null>(null);

    // Load Stripe
    useEffect(() => {
        const initializeStripe = async () => {
            try {
                setStripeLoading(true);
                const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
                
                if (!publishableKey) {
                    throw new Error("Stripe publishable key is not configured");
                }
                
                const stripeInstance = await loadStripe(publishableKey);
                
                if (!stripeInstance) {
                    throw new Error("Failed to initialize Stripe");
                }
                
                setStripe(stripeInstance);
                setPaymentError(null);
            } catch (error) {
                console.error("Error loading Stripe: ", error, import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                const stripeError = error instanceof Error ? error : new Error("Failed to load Stripe");
                setPaymentError(stripeError);
                onError?.(stripeError);
            } finally {
                setStripeLoading(false);
            }
        };

        if (open) {
            initializeStripe();
        }
    }, [open, onError]);

    // Create payment intent
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const result = await client.createPaymentIntent.mutate();
                setClientSecret(result.clientSecret!);
            } catch (error) {
                const paymentError = error instanceof Error ? error : new Error("Failed to create payment intent");
                setPaymentError(paymentError);
                onError?.(paymentError);
            }
        };

        if (open && stripe && !paymentError) {
            createPaymentIntent();
        }
    }, [open, stripe, paymentError, onError]);

    // Track errors to Amplitude
    useEffect(() => {
        if (paymentError && open) {
            // Determine error type based on whether Stripe was loaded
            const errorType = !stripe ? "stripe_initialization" : "payment_intent_creation";
            const eventName = !stripe ? "Stripe Error" : "Payment Error";
            
            track(eventName, {
                error_message: paymentError.message,
                error_type: errorType,
                location: "PurchaseModal",
                timestamp: new Date().toISOString(),
                stripe_loaded: !!stripe,
                has_client_secret: !!clientSecret
            });
        }
    }, [paymentError, open, stripe, clientSecret]);

    const appearance: Appearance = {
        theme: "stripe",
    };
    const options: StripeElementsOptions = {
        clientSecret: clientSecret || undefined,
        appearance,
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Iegādāties kursu
                    </DialogTitle>
                    <DialogDescription>
                        "No sāpēm uz spēku" - kurss par vardarbības atpazīšanu un pārvarēšanu partnerattiecībās.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="border rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold">Kursa saturs:</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Teorētiska bāze par vardarbību
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Pašnovērtēšanas tests
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Personīgā pieredze un padomi
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-600" />
                                Ceļš uz atbrīvošanos
                            </li>
                        </ul>
                    </div>

                    <div className="min-h-[100px] flex items-center justify-center">
                        {stripeLoading && (
                            <div className="text-center text-muted-foreground">
                                Ielādē maksājumu formu...
                            </div>
                        )}
                        
                        {paymentError && (
                            <div className="text-center text-destructive">
                                <p>Kļūda ielādējot maksājumu sistēmu</p>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => window.location.reload()}
                                    className="mt-2"
                                >
                                    Mēģināt vēlreiz
                                </Button>
                            </div>
                        )}
                        
                        {!stripeLoading && !paymentError && stripe && clientSecret && (
                            <Elements options={options} stripe={stripe}>
                                <PaymentForm onClose={() => onOpenChange(false)} />
                            </Elements>
                        )}
                    </div>

                    <div className="border rounded-lg p-4 bg-primary/5">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">Cena:</span>
                            <span className="text-2xl font-bold flex items-center gap-1">
                                <Euro className="w-5 h-5" />
                                29.99
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Vienreizējs maksājums, mūža piekļuve
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Aizvērt
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
