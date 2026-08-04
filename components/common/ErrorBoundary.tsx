'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in Component:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 bg-[#8b0000]/20 border border-[#8b0000]/50 rounded-xl text-center my-4">
          <h3 className="text-red-400 font-bold text-base mb-2">⚠️ Có lỗi xảy ra trong quá trình xử lý!</h3>
          <p className="text-xs text-red-200 mb-4">{this.props.fallbackMessage || this.state.error?.message || 'Vui lòng kiểm tra lại thao tác hoặc tải lại trang.'}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-[#8b0000] text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
