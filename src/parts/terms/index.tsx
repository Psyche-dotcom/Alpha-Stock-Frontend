"use client";

import { useState } from "react";

const Terms: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("");

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const list = [
    {
      id: 1,
      title: "Acceptance of terms",
      value: "acceptance-of-terms",
    },
    {
      id: 2,
      title: "Change to Terms",
      value: "change-to-terms",
    },
    {
      id: 3,
      title: "Prohibited Uses",
      value: "prohibited-uses",
    },
    {
      id: 4,
      title: "Monitoring and Enforcement",
      value: "moniroting-and-enforcement",
    },
    {
      id: 5,
      title: "Privacy Policy Information We Collect",
      value: "policy-information",
    },
    {
      id: 7,
      title: "Usage information Device information",
      value: "useage-information",
    },
    {
      id: 8,
      title: "International Transfers",
      value: "international-transfers",
    },
    {
      id: 9,
      title: "Children's Privacy",
      value: "children-privacy",
    },
    {
      id: 10,
      title: "Change to Pricacy Policy",
      value: "change-to-privacy-policy",
    },
  ];
  return (
    <div className="gap-4 flex mt-8">
      <div className="xl:w-[21.875rem] lg:w-[18.5rem] md:w-[15rem] hidden md:block">
        <div className=" bg-white rounded-[12px] flex flex-col gap-2.5 p-[1rem] pb-[3.25rem]">
          {list.map((_, index) => (
            <h6
              key={index}
              className={`${
                currentTab === _.value
                  ? "font-semibold text-[#111928]"
                  : "underline text-[#6B7280]"
              } lg:text-base text-sm cursor-pointer`}
              onClick={() => {
                setCurrentTab(_.value);
                scrollToSection(_.value);
              }}
            >
              {_.title}
            </h6>
          ))}
        </div>
      </div>
      <div
        className="xl:p-[2rem] p-3 sm:p-6 md:p-7 text-[#111928] bg-white hide-scrollbar lg:rounded-[1.25rem] rounded-lg flex-1"
        style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}
      >
        <h5 className="font-semibold text-[2.25rem] lg:mb-[2rem] mb-5 md:mb-7">
          Terms of Use & Privacy Policy
        </h5>
        Last Updated: [Current Date] <br />
        <h6 className="font-bold sm:text-2xl text-xl" id="acceptance-of-terms">
          Acceptance of Terms
        </h6>
        <br />{" "}
        <p className="font-medium sm:text-base text-sm mb-[2rem]">
          By accessing or using alphastrategy.io (the "Website"), you agree to
          these Terms of Use and our Privacy Policy. If you disagree with these
          terms, please do not use our Website. Alpha Strategy LLC ("Company,"
          "we," or "us"), a company registered in Barcelona, Spain, provides
          this Website subject to these terms. You confirm you are of legal age
          to form binding contracts in your jurisdiction. If you do not meet
          this requirement, you must not use the Website. <br />
        </p>
        <h6 className="font-bold sm:text-2xl text-xl" id="change-to-terms">
          Changes to Terms
        </h6>
        <br />{" "}
        <p className="font-medium sm:text-base text-sm mb-[2rem]">
          We may update these terms at our discretion. Changes take effect
          immediately upon posting. Your continued use constitutes acceptance of
          revised terms. We recommend checking this page regularly. Accessing
          the Website We reserve the right to modify or discontinue the Website
          without notice. We are not liable if the Website becomes unavailable.
          You are responsible for: Arrangements necessary to access the Website
          Ensuring anyone accessing through your connection complies with these
          terms For registration, you must provide accurate information. Treat
          your account credentials as confidential and notify us immediately of
          security breaches. We may disable accounts that violate these terms.
          Intellectual Property Rights The Website content is owned by Alpha
          Strategy LLC and protected by Spanish, European, and international
          intellectual property laws. You may use it only for personal,
          non-commercial purposes. Permitted uses: Temporary storage in RAM
          while viewing Browser cache files Printing/downloading single copies
          for personal use Using social media features as provided You must not:
          Modify Website content Use visual elements separately from
          accompanying text Remove copyright notices For other uses, contact:{" "}
          <a
            href="mailto:info@alphastrategy.io"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            info@alphastrategy.io
          </a>{" "}
        </p>
        <h5 className="font-bold sm:text-2xl text-xl" id="prohibited-uses">
          Prohibited Uses
        </h5>
        <br />
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
          <li>
            You agree not to use the Website:
            <ul className="list-disc pl-6 space-y-1">
              <li>In violation of applicable laws</li>
              <li>To harm minors</li>
              <li>To transmit unsolicited advertising</li>
              <li>To impersonate others</li>
              <li>To interfere with others' use</li>
            </ul>
          </li>

          <li>
            Additionally, you agree not to:
            <ul className="list-disc pl-6 space-y-1">
              <li>Disable or damage the Website</li>
              <li>Use automated tools to access the Website</li>
              <li>Introduce malicious code</li>
              <li>Attempt unauthorized access</li>
              <li>Attack the Website through denial-of-service methods</li>
            </ul>
          </li>

          <li>
            User Contributions: Interactive features allow you to post content.
            By posting, you grant us a non-exclusive, royalty-free license to
            use and display your contributions. You represent that you own the
            rights to your contributions and that they comply with these terms.
          </li>
        </ul>
        <br />
        <h5
          className="font-bold sm:text-2xl text-xl"
          id="moniroting-and-enforcement"
        >
          Monitoring and Enforcement
        </h5>
        <br />
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
          <li>
            We reserve the right to:
            <ul className="list-disc pl-6 space-y-1">
              <li>Remove any user contribution</li>
              <li>Take action against violations</li>
              <li>Disclose your identity as required by law</li>
              <li>Terminate access for violations</li>
            </ul>
          </li>

          <li>
            Content Standards: User contributions must comply with applicable
            laws and must not:
            <ul className="list-disc pl-6 space-y-1">
              <li>Be defamatory or offensive</li>
              <li>Promote illegal activities</li>
              <li>Infringe on others' rights</li>
              <li>Deceive others</li>
              <li>Impersonate others</li>
              <li>Involve commercial solicitation</li>
            </ul>
          </li>

          <li>
            Copyright Infringement: We respect intellectual property rights. If
            you believe content violates your copyright, please contact us with
            details of the alleged infringement.
          </li>

          <li>
            Information Reliability: Content on the Website is for informational
            purposes only. It is not professional advice. Consult appropriate
            professionals before making decisions based on Website content. The
            Company and its affiliates are not responsible for:
            <ul className="list-disc pl-6 space-y-1">
              <li>Accuracy of third-party content</li>
              <li>Direct or consequential losses from using the Website</li>
              <li>Investment decisions based on Website information</li>
            </ul>
          </li>

          <li>
            Changes to the Website: We may update content without notice and
            cannot guarantee content is complete or current.
          </li>

          <li>
            Refund Policy: All payments are final. No refunds will be issued.
          </li>
        </ul>
        <br />
        <h5 className="font-bold sm:text-2xl text-xl" id="policy-information">
          Privacy Policy Information We Collect
        </h5>
        <br />
        <p className="font-medium sm:text-base text-sm mb-[2rem]">
          We collect: Personal information (name, email, address)
        </p>
        <h5 className="font-bold sm:text-2xl text-xl" id="useage-information">
          Usage information Device information
        </h5>
        <br />
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 mb-1">
          <li>
            We collect this information:
            <ul className="list-disc pl-6 space-y-2">
              <li>Directly from you</li>
              <li>Automatically when you use the Website</li>
              <li>From third parties</li>
            </ul>
          </li>
        </ul>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
          <li>
            How We Use Information: We use your information to:
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve the Website</li>
              <li>Process transactions</li>
              <li>Communicate with you</li>
              <li>Personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </li>

          <li>
            Information Sharing: We may share information:
            <ul className="list-disc pl-6 space-y-1">
              <li>With service providers</li>
              <li>During business transfers</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights</li>
            </ul>
          </li>

          <li>
            Data Security: We implement reasonable security measures but cannot
            guarantee absolute security.
          </li>

          <li>
            Your Rights Under European Law: As a European user, you have rights
            to:
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Lodge complaints with supervisory authorities</li>
            </ul>
            <div className="mt-1">
              To exercise these rights, contact:
              <span className="text-blue-600 underline ml-1">
                info@alphastrategy.com
              </span>
            </div>
          </li>

          <li>
            Cookies and Tracking: We use cookies and similar technologies to
            improve your experience. You can manage cookie settings in your
            browser.
          </li>
        </ul>
        <br />
        <h5
          className="font-bold sm:text-2xl text-xl"
          id="international-transfers"
        >
          International Transfers
        </h5>
        <br />
        <p className="font-medium sm:text-base text-sm mb-[2rem]">
          Your information may be transferred to countries with different data
          protection laws. We ensure appropriate safeguards are in place for
          such transfers.
        </p>
        <br />
        <h5 className="font-bold sm:text-2xl text-xl" id="children-privacy">
          Children's Privacy
        </h5>
        <br />
        <p className="font-medium sm:text-base text-sm mb-[2rem]">
          Our Website is not intended for children under 16. We do not knowingly
          collect data from children. <br />
        </p>
        <br />
        <h5
          className="font-bold sm:text-2xl text-xl"
          id="change-to-privacy-policy"
        >
          Changes to Privacy Policy
        </h5>
        <br />{" "}
        <p className="font-medium sm:text-base text-sm mb-[2rem]">
          We will post changes on this page and notify you of material changes.
          General Legal Provisions Limitation of Liability TO THE EXTENT
          PERMITTED BY LAW, ALPHA STRATEGY LLC SHALL NOT BE LIABLE FOR DAMAGES
          ARISING FROM YOUR USE OF THE WEBSITE. OUR LIABILITY IS LIMITED TO THE
          AMOUNT PAID TO US IN THE LAST 12 MONTHS. Indemnification You agree to
          indemnify and hold harmless Alpha Strategy LLC from claims arising
          from your violation of these terms. Dispute Resolution Disputes shall
          be resolved through: Informal negotiation If unresolved, through
          arbitration under Spanish law Proceedings shall be conducted in
          Barcelona, Spain Governing Law These terms are governed by Spanish
          law. You submit to the exclusive jurisdiction of Spanish courts. Time
          Limitation Claims must be commenced within one year after the cause of
          action arises. Contact Information Alpha Strategy LLC Barcelona, Spain
          Email:{" "}
          <a
            href="mailto:info@alphastrategy.io"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            info@alphastrategy.io
          </a>
        </p>
      </div>
    </div>
  );
};

export default Terms;
