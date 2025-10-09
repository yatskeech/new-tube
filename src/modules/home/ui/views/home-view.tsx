import { CategoriesSection } from '../components';

export function HomeView() {
  return (
    <div
      className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5"
    >
      <CategoriesSection />
    </div>
  );
}
