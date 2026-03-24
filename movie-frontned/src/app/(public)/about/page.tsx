import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-16">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            About Our Platform
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Learn how our platform works and what drives our vision to build a
            better digital experience for everyone.
          </p>
        </div>

        {/* How It Works */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">1. Create Account</h3>
              <p className="text-gray-600">
                Users sign up and create their account to access all features of
                the platform securely.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">2. Explore & Use</h3>
              <p className="text-gray-600">
                Browse services, interact with features, and manage tasks easily
                through a clean and intuitive interface.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">3. Achieve Goals</h3>
              <p className="text-gray-600">
                Track progress, complete tasks, and achieve your goals efficiently
                using our smart tools.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Our vision is to empower users by providing a seamless and powerful
            digital platform that simplifies everyday tasks. We aim to create a
            future where technology is accessible, efficient, and user-friendly
            for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We are committed to building high-quality solutions with modern
            technologies like Next.js and TypeScript. Our mission is to deliver
            fast, secure, and scalable applications that improve user
            productivity and experience.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;