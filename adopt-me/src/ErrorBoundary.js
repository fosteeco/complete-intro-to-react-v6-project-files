// Brian mostly took this from the React docs

import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(e) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // I log this to Sentry, Azure Monitor, New Relic, TrackJS
    console.error("ErrorBoundary Caught an error.", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          This listing has an erorr. <Link to="/">Click here</Link> to go back
          to the home page.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
