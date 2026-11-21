import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-ivory">
          <div className="bg-ivory border border-stone-taupe/30 rounded-panel p-8 sm:p-12 max-w-lg w-full text-center shadow-lg">
            <div className="w-14 h-14 rounded-full bg-sand-beige/40 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-soft-charcoal" />
            </div>

            <span className="font-montserrat text-micro text-gold uppercase tracking-widest font-semibold block mb-2">
              Something went wrong
            </span>

            <h2 className="font-montserrat font-semibold text-heading text-soft-charcoal mb-4">
              Unable to display this view
            </h2>

            <p className="font-montserrat text-body-sm text-stone-taupe leading-relaxed mb-8">
              An unexpected error occurred while rendering this section. You can refresh the page or return to the home screen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReset}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4.5 h-4.5 mr-2" />
                <span>Reload Page</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
