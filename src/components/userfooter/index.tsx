import Link from "next/link";

type FooterLinkProps = {
  href: string;
  label: string;
  external?: boolean;
};

export default function FooterLink({
  href,
  label,
  external = false,
}: FooterLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl px-6 py-3 shadow-sm text-sm font-semibold text-black hover:underline"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="bg-white rounded-xl px-6 py-3 shadow-sm text-sm font-semibold text-black hover:underline"
    >
      {label}
    </Link>
  );
}
