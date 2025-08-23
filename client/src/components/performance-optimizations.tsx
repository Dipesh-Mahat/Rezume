import { memo, useMemo, useCallback, lazy, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// Memoized form components to prevent unnecessary re-renders
export const MemoizedPersonalInfo = memo(function PersonalInfoComponent({ data, updateData }: any) {
  const debouncedUpdate = useDebouncedCallback(
    updateData,
    500
  );

  const handleUpdate = useCallback((field: string, value: any) => {
    debouncedUpdate({ personalInfo: { ...data.personalInfo, [field]: value } });
  }, [data.personalInfo, debouncedUpdate]);

  return (
    // Component implementation would go here
    <div>Personal Info Form</div>
  );
});

// Performance monitoring hook
export function usePerformanceMonitor() {
  const trackPageLoad = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log('Page load time:', loadTime + 'ms');
      
      // In production, you might send this to an analytics service
      // analytics.track('page_load_time', { duration: loadTime });
    }
  }, []);

  const trackUserAction = useCallback((action: string, metadata?: any) => {
    const timestamp = Date.now();
    console.log(`User action: ${action}`, { timestamp, ...metadata });
    
    // Store in local storage for debugging
    const actions = JSON.parse(localStorage.getItem('user_actions') || '[]');
    actions.push({ action, timestamp, metadata });
    
    // Keep only last 100 actions
    if (actions.length > 100) {
      actions.splice(0, actions.length - 100);
    }
    
    localStorage.setItem('user_actions', JSON.stringify(actions));
  }, []);

  return { trackPageLoad, trackUserAction };
}

// Optimized image loading component
export function OptimizedImage({ src, alt, className, ...props }: any) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}

// Virtual scrolling for large lists (if needed)
export function VirtualizedList({ items, renderItem, itemHeight = 50 }: any) {
  const containerHeight = 300; // Adjust as needed
  const visibleItems = Math.ceil(containerHeight / itemHeight) + 2;
  
  return (
    <div 
      style={{ 
        height: containerHeight, 
        overflowY: 'auto' 
      }}
      className="virtual-list"
    >
      {items.slice(0, visibleItems).map((item: any, index: number) => (
        <div key={index} style={{ height: itemHeight }}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Bundle size optimization utilities
export const LazyComponents = {
  // Lazy load heavy components
  ResumeAnalytics: lazy(() => import('./analytics-tracking').then(module => ({ default: module.ResumeAnalytics }))),
  PDFExport: lazy(() => import('./pdf-enhanced').then(module => ({ default: module.EnhancedPDFExport }))),
  DataExport: lazy(() => import('./data-export').then(module => ({ default: module.DataExportImport })))
};

// Memory leak prevention
export function useCleanup(cleanup: () => void) {
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
}

// Efficient state updates
export function useOptimizedState<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  
  const updateState = useCallback((updates: Partial<T>) => {
    setState(prevState => {
      const newState = { ...prevState, ...updates };
      
      // Only update if there are actual changes
      if (JSON.stringify(prevState) === JSON.stringify(newState)) {
        return prevState;
      }
      
      return newState;
    });
  }, []);

  return [state, updateState] as const;
}

