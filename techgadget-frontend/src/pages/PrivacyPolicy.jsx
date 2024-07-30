import React from "react";
import { STORE_EMAIL } from "../utils/constants";

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-4 lg:px-48 py-8">
      <div className="mb-16">
        <h1 className="text-3xl">Privacy Policy</h1>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          Welcome to Tech Gadget KV. Your privacy is important to us. This
          Privacy Policy outlines how we collect, use, and protect your
          information when you visit our website and use our services. By using
          our site, you agree to the terms outlined in this policy.
        </p>
        <p>
          We collect personal information such as your name, email address,
          mailing address, and payment details when you make a purchase or sign
          up for our newsletter. This information is used to process your
          orders, communicate with you, and improve our services.
        </p>
        <p>
          We also collect non-personal information such as your browser type,
          operating system, and IP address to help us understand how our website
          is used and to improve our online experience. This data is collected
          through cookies and other tracking technologies.
        </p>
        <p>
          Your information is kept secure and is only shared with third parties
          who assist us in operating our website, conducting our business, or
          servicing you, as long as those parties agree to keep this information
          confidential. We do not sell, trade, or otherwise transfer your
          personal information to outside parties without your consent.
        </p>
        <p>
          We may also release your information when we believe release is
          appropriate to comply with the law, enforce our site policies, or
          protect ours or others' rights, property, or safety. Non-personal
          visitor information may be provided to other parties for marketing,
          advertising, or other uses.
        </p>
        <p>
          By using our site, you consent to our website's privacy policy. If we
          decide to change our privacy policy, we will post those changes on
          this page. This policy was last modified on [Date].
        </p>
        <p>
          If you have any questions regarding this privacy policy, you may
          contact us using the information below:
          <br />
          <br />
          Email: {STORE_EMAIL}
          <br />
          <br />
          Tech Gadget KV
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
