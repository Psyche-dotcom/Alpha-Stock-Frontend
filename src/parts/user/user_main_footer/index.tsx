import FooterLink from "@/components/userfooter";
import SocialIcons from "./social_icon";

export default function Footer() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center my-8">
      <SocialIcons />
      <FooterLink
        href="/terms-and-conditions"
        label="Terms and Conditions"
        external={true}
      />
      <FooterLink href="/report-issue" label="Report Issue" />
      <FooterLink
        href="mailto:support@alphainvestments.com"
        label="support@alphainvestments.com"
        external
      />
    </div>
  );
}
