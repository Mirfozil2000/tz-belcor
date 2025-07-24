"use client";

import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "../store";
import LoadingSpinner from "../components/LoadingSpinner";

const DynamicApp = dynamic(() => import("../components/ClientApp"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  return (
    <Provider store={store}>
      <DynamicApp />
    </Provider>
  );
}
