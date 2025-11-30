import Footer from "../components/Footer";

const Terms = () => {
    return (
        <div>    
            <div className="min-h-screen bg-gray-50 py-8 px-4 pt-30 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    
                    <div className="bg-linear-to-r from-gray-600 to-purple-600 px-6 py-8 text-white">
                        <h1 className="text-4xl font-bold text-center mb-2">Terms & Conditions</h1>
                        <p className="text-center text-gray-100">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    
                    <div className="px-6 py-8 space-y-8">
                        
                        <div className="text-gray-600 leading-relaxed">
                            <p className="mb-4">
                                Welcome to SMstore. Please read these terms and conditions carefully before using our website 
                                and services.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing and using SMstore, you accept and agree to be bound by these terms and conditions. 
                                If you disagree with any part, you may not access our services.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                2. Account Registration
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                You must be at least 18 years old to create an account. You are responsible for maintaining the 
                                confidentiality of your account and password and for all activities under your account.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                3. Products and Pricing
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                All products are subject to availability. We reserve the right to discontinue any product at any time. 
                                Prices are subject to change without notice.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                4. Payment Methods
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We accept various payment methods including credit cards, debit cards, and digital wallets. 
                                All transactions are processed through secure payment gateways.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                5. Shipping & Delivery
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Shipping costs and delivery times vary based on location and shipping method. Risk of loss 
                                passes to you upon delivery to the carrier.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                6. Returns & Refunds
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                We accept returns within 30 days of delivery. Products must be unused and in original packaging. 
                                Refunds will be processed to the original payment method.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                7. Intellectual Property
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                All content on SMstore, including logos, text, graphics, and images, is our property and 
                                protected by copyright laws.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                8. Limitation of Liability
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                SMstore shall not be liable for any indirect, incidental, special, consequential, or punitive 
                                damages resulting from your use of our services.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                9. Governing Law
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                These terms shall be governed by and construed in accordance with the laws of your country/region, 
                                without regard to its conflict of law provisions.
                            </p>
                        </div>

                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-gray-500 pl-4">
                                10. Contact Information
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                For any questions about these Terms & Conditions, please contact us at:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700">Email: matusalasana@gmail.com</p>
                                <p className="text-gray-700">Phone: +251-945807386</p>
                                <p className="text-gray-700">Address: King George VI street, Addis Ababa City, Ethiopia.</p>
                            </div>
                        </div>

                        
                        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mt-8">
                            <p className="text-gray-700">
                                <strong>Note:</strong> By using our website, you acknowledge that you have read, understood, 
                                and agree to be bound by these Terms & Conditions.
                            </p>
                        </div>
                    </div>

                </div>
                
            </div>
            <Footer />
        </div>
    );
};

export default Terms;