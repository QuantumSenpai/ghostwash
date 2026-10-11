import Link from "next/link";
import { PhantomMark } from "../components/ui/PhantomMark";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center max-w-md gap-4">
        <PhantomMark size={36} className="text-[var(--color-text-secondary)]" />
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
          Page not found
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          The draft, job, or destination you were looking for does not exist or may have expired.
        </p>
        <Link href="/" className="mt-2">
          <Button variant="secondary" size="md">
            Return to Studio
          </Button>
        </Link>
      </div>
    </main>
  );
}
