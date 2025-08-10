// app/privacy/page.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4">
        <p>
          This Privacy Policy explains how <strong>Statify</strong> (“we”, “our”, or “us”)
           collects, uses, and protects information when you use our
          application.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
        <p>
          When you log in with Spotify, we may request permission to access certain
          information from your Spotify account, such as:
        </p>
        <ul className="list-disc pl-6">
          <li>Your Spotify profile information (display name, email address, profile image, country).</li>
          <li>Your playlists, top artists, top tracks, or recently played tracks.</li>
          <li>Other data you consent to share via Spotify&apos;s authorization process.</li>
        </ul>
        <p>
          We do not collect any personal information outside of what you explicitly
          approve through Spotify&apos;s login screen.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
        <p>We use the information from Spotify solely to:</p>
        <ul className="list-disc pl-6">
          <li>Provide and improve app features.</li>
          <li>Display your music data in the app interface.</li>
          <li>Personalize your experience.</li>
        </ul>
        <p>
          We do not sell, rent, or share your personal data with third parties for
          marketing purposes.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Data Storage</h2>
        <p>
          We do not permanently store your Spotify data on our servers. Any access
          tokens we store are temporary and used only to make requests to Spotify&apos;s
          API on your behalf. When you log out or your token expires, we can no longer
          access your Spotify account.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Third-Party Services</h2>
        <p>
          Our app uses the Spotify Web API provided by Spotify AB. Your use of
          Spotify&apos;s services is subject to Spotify&apos;s own Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
        <p>You may:</p>
        <ul className="list-disc pl-6">
          <li>Revoke our access to your Spotify account at any time from your Spotify account settings.</li>
          <li>Request that we delete any data we may have stored about you by contacting us at <strong>rhnsrsh2005@gmail.com</strong>.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make changes, we
          will update the “Last updated” date above.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
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
