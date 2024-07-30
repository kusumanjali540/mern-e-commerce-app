import React from "react";
import { STORE_EMAIL } from "../utils/constants";

const TermsOfService = () => {
  return (
    <div className="w-full px-4 lg:px-48 py-8">
      <div className="mb-16">
        <h1 className="text-3xl">Terms of Service</h1>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          Welcome to Tech Gadget KV. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
        </p>
        <p>
          You must be at least 18 years old to use our website and services. By using our website, you represent and warrant that you are at least 18 years of age. If you are using our website on behalf of a company or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
        </p>
        <p>
          You agree to use our website and services only for lawful purposes and in accordance with these Terms. You agree not to use our website in any way that could damage, disable, overburden, or impair our site or interfere with any other party's use of our website. You agree not to obtain or attempt to obtain any materials or information through any means not intentionally made available through our website.
        </p>
        <p>
          All content on our website, including text, graphics, logos, images, and software, is the property of Tech Gadget KV or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works from any content on our website without our express written permission.
        </p>
        <p>
          Our website may contain links to third-party websites that are not owned or controlled by Tech Gadget KV. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. By using our website, you expressly relieve Tech Gadget KV from any and all liability arising from your use of any third-party website.
        </p>
        <p>
          We reserve the right to modify or terminate our website or services for any reason, without notice, at any time. We also reserve the right to modify these Terms at any time. Any changes to these Terms will be posted on this page. By continuing to use our website after any changes are posted, you agree to be bound by the updated Terms.
        </p>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
