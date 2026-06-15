import Image from "next/image";

/**
 * Company logo. Uses the official AItewan mark — never recoloured or distorted.
 * `variant="white"` uses the white-on-transparent version for dark surfaces.
 */
export function Logo({
  variant = "default",
  className = "h-9 w-auto",
  priority = false,
  alt = "智德萬 AItewan 生醫科技",
}: {
  variant?: "default" | "white";
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  const src = variant === "white" ? "/aitewan-logo-white.png" : "/aitewan-logo.svg";
  const size = variant === "white" ? { width: 214, height: 100 } : { width: 1082, height: 506 };

  if (variant === "white") {
    return (
      <Image
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 sm:gap-3 ${className}`}
      role="img"
      aria-label={alt}
      translate="no"
      data-no-translate
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        width={size.width}
        height={size.height}
        priority={priority}
        className="h-full w-auto shrink-0"
      />
      <span
        aria-hidden
        className="shrink-0 whitespace-nowrap text-[0.94rem] font-bold leading-none text-[#168ac0] sm:text-xl lg:text-2xl"
      >
        智德萬生醫科技
      </span>
    </span>
  );
}
