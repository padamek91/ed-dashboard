
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SearchableDropdownProps {
  placeholder: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: string[];
  onItemSelect: (item: string) => void;
  commonItems?: string[];
  popoverTitle?: string;
}

const SearchableDropdown = ({
  placeholder,
  searchQuery,
  onSearchChange,
  searchResults,
  onItemSelect,
  commonItems = [],
  popoverTitle = "Common Items"
}: SearchableDropdownProps) => {
  
  return (
    <div>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">{popoverTitle}</h4>
              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                {commonItems.slice(0, 10).map((item, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="justify-start h-auto py-2 px-3 text-left"
                    onClick={() => onItemSelect(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {searchResults.length > 0 && searchQuery && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {searchResults.map((item, index) => (
              <div 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onItemSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
