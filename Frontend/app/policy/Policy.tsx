import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={
          "w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"
        }
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            This Privacy Policy was last updated on May 1, 2024. Thank you for
            joining Academy IQ. We at Academy IQ (Academy IQ, “we”, “us”)
            respect your privacy and want you to understand how we collect, use,
            and share data about you. This Privacy Policy covers our data
            collection practices and describes your rights regarding your
            personal data. Unless we link to a different policy or state
            otherwise, this Privacy Policy applies when you visit or use Academy
            IQ websites, mobile applications, APIs, or related services (the
            “Services”). It also applies to prospective customers of our
            business and enterprise products. By using the Services, you agree
            to the terms of this Privacy Policy. You shouldn’t use the Services
            if you don’t agree with this Privacy Policy or any other agreement
            that governs your use of the Services.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            1. What Data We Get: <br />
            We collect certain data from you directly, like information you
            enter yourself, data about your consumption of content, and data
            from third-party platforms you connect with Udemy. We also collect
            some data automatically, like information about your device and what
            parts of our Services you interact with or spend time using. All
            data listed in this section is subject to the following processing
            activities: collecting, recording, structuring, storing, altering,
            retrieving, encrypting, pseudonymizing, erasing, combining, and
            transmitting.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            2. How We Get Data About You:
            <br />
            We use tools like cookies, web beacons, and similar tracking
            technologies to gather the data listed above. Some of these tools
            offer you the ability to opt out of data collection.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            3. What We Use Your Data For: <br />
            We use your data to do things like provide our Services, communicate
            with you, troubleshoot issues, secure against fraud and abuse,
            improve and update our Services, analyze how people use our
            Services, serve personalized advertising, and as required by law or
            necessary for safety and integrity. We retain your data for as long
            as it is needed to serve the purposes for which it was collected.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            4. Who We Share Your Data With: <br />
            We share certain data about you with instructors, other students,
            companies performing services for us, Udemy affiliates, our business
            partners, analytics and data enrichment providers, your social media
            providers, companies helping us run promotions and surveys, and
            advertising companies who help us promote our Services. We may also
            share your data as needed for security, legal compliance, or as part
            of a corporate restructuring. Lastly, we can share data in other
            ways if it is aggregated or de-identified or if we get your consent.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            5. Security: <br />
            We use appropriate security based on the type and sensitivity of
            data being stored. As with any internet-enabled system, there is
            always a risk of unauthorized access, so it’s important to protect
            your password and to contact us if you suspect any unauthorized
            access to your account.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            6. Your Rights: <br />
             You have certain rights around the use of your data,
            including the ability to opt out of promotional emails, cookies, and
            collection of your data by certain third parties. You can update or
            terminate your account from within our Services, and can also
            contact us for individual rights requests about your personal data.
            Parents who believe we’ve unintentionally collected personal data
            about their underage child should contact us for help deleting that
            information.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
