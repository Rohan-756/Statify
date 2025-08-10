// app/terms/page.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4">
        <p>
          These Terms of Service (“Terms”) govern your use of{" "}
          <strong>Statify</strong> (“we”, “our”, or “us”). By accessing or
          using our application, you agree to be bound by these Terms. If you do not
          agree, you may not use our app.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Use of Our App</h2>
        <p>
          You may use our application only in compliance with these Terms and all
          applicable laws and regulations. You must be at least 13 years old, or the
          age of majority in your jurisdiction, to use the app.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Spotify Integration</h2>
        <p>
          Our app uses the Spotify Web API. Your use of Spotify&apos;s services is subject
          to Spotify&apos;s own Terms of Service and Privacy Policy. You are responsible
          for complying with Spotify&apos;s rules while using our app.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Accounts and Security</h2>
        <p>
          When you connect your Spotify account, you authorize us to access
          information you approve through Spotify&apos;s login process. You are responsible
          for safeguarding your account and notifying us of any unauthorized use.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6">
          <li>Use the app for any unlawful purpose.</li>
          <li>Attempt to gain unauthorized access to our systems.</li>
          <li>Interfere with or disrupt the functionality of the app.</li>
          <li>Copy, modify, or distribute any part of the app without permission.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">5. Intellectual Property</h2>
        <p>
          All content, trademarks, and logos in the app are owned by us or our
          licensors. You may not use them without prior written consent.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Limitation of Liability</h2>
        <p>
          Our app is provided “as is” without warranties of any kind. We are not
          liable for any damages resulting from your use of the app, to the fullest
          extent permitted by law.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the app after
          changes indicates your acceptance of the new Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />📧 <strong>rhnsrsh2005@gmail.com</strong>
        </p>
      </section>
      <Link href="/" aria-label="Connect your Spotify account to start viewing stats">
              <Button
                className="text-md p-[10px] font-semibold rounded-full bg-[#1ed760] hover:bg-[#1db954] cursor-pointer active:bg-[#1db954] mx-auto flex justify-center items-center w-2/3 min-w-fit mt-8"
              >
                Go back
                <ArrowRight />
              </Button>
            </Link>
    </main>
  );
}
