
//error boundary configs 
import React from "react"

type ErrorBoundaryState = {
    hasError: boolean
    error: Error | null
    info: React.ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
    
    constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = { hasError: false, error: null, info: null }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log the error to an error reporting service
        console.error("Error caught by boundary:", error, info)
        this.setState({ hasError: true, error, info })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "20px", border: "1px solid red", borderRadius: "8px" }}>
                    <h3>Something went wrong.</h3>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.info?.componentStack}
                    </details>
                    <button 
                        onClick={() => this.setState({ hasError: false, error: null, info: null })}
                        style={{ marginTop: "10px", cursor: "pointer" }}
                    >
                        Try again
                    </button>
                </div>
            )
        }

        return this.props.children
    }
} 

