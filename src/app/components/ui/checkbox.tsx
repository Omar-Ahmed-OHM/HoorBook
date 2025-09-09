import { useState, Fragment, ReactNode, useCallback, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";
import { BottomSelectFieldProps } from "@/app/lib/type";

export default function BottomSelectField({
  title,
  placeholder,
  selectedValue,
  options,
  onSelect,
  icon,
  canOpen = true,
  onBlockedOpen,
}: BottomSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setDebouncedSearch(value), 300),
    []
  );

  // Filtered options memoized
  const filteredOptions = useMemo(
    () =>
      options?.filter((option) =>
        option.toLowerCase().includes(debouncedSearch.toLowerCase())
      ),
    [options, debouncedSearch]
  );

  // Handlers
  const handleOpen = () => {
    if (canOpen) {
      setIsOpen(true);
      setSearch("");
      setDebouncedSearch("");
    } else if (onBlockedOpen) {
      onBlockedOpen();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearch("");
    setDebouncedSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    handleClose();
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="relative mb-3">
        <button
          type="button"
          onClick={handleOpen}
          className="w-full border border-gray-400 shadow-md rounded-md p-3 bg-white text-right flex gap-5 items-center"
        >
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className={`text-sm ${!selectedValue ? "text-gray-950" : ""}`}>
            {selectedValue || placeholder || `اختر ${title}`}
          </span>
        </button>
      </div>

      {/* Modal */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1300]" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 z-[1300]" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0 lg:w-1/2 mx-auto z-[1300]">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="bg-white rounded-t-2xl px-4 max-h-[70vh] overflow-y-auto relative z-[1400]">
                <div className="sticky top-0 bg-white z-10 p-3 border-b border-gray-200">
                  <Dialog.Title className="text-center font-bold text-xl mb-3 text-black">
                    {title}
                  </Dialog.Title>
                  {/* Search Field */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="بحث"
                      className="w-full border border-black rounded-md p-2 pr-10 text-right outline-none text-gray-800"
                      value={search}
                      onChange={handleSearchChange}
                      aria-label="بحث"
                    />
                    <FaSearch className="absolute right-3 top-3 text-gray-900" />
                  </div>
                </div>
                {/* Options List */}
                <ul className="divide-y">
                  {filteredOptions?.map((option, index) => (
                    <li
                      key={index}
                    
                      className="py-3 px-2 text-right cursor-pointer hover:bg-gray-100 text-black"
                      onClick={() => handleSelect(option)}
                      tabIndex={0}
                      role="option"
                      aria-selected={selectedValue === option}
                    >
                      {option}
                    </li>
                  ))}
                  {filteredOptions?.length === 0 && (
                    <li className="text-center text-gray-900 py-4">
                      لا توجد نتائج
                    </li>
                  )}
                </ul>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}