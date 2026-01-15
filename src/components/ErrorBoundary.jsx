import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-red-500 font-mono p-10 flex flex-col items-center justify-center z-[9999] relative">
                    <h1 className="text-4xl font-bold mb-4">SYSTEM FAILURE</h1>
                    <p className="text-xl mb-8">The application has encounted a critical error.</p>
                    <div className="bg-gray-900 p-6 rounded-lg border border-red-900 w-full max-w-4xl overflow-auto text-left">
                        <p className="font-bold text-red-400 mb-2">{this.state.error && this.state.error.toString()}</p>
                        <details className="mt-4 cursor-pointer">
                            <summary className="text-gray-400 hover:text-white">View Stake Trace</summary>
                            <pre className="text-xs text-gray-500 whitespace-pre-wrap mt-2">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors"
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
