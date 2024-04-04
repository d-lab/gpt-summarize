/*
 * Copyright (c) Meta Platforms and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import {
  BaseFrontend,
  OnboardingComponent,
  LoadingScreen,
} from "./components/core_components.jsx";
import { useMephistoTask, ErrorBoundary } from "mephisto-task";
import {
  useAnnotatorTracker,
  ActivityTrackerDisclosure,
} from "@annotated/annotator-tracker";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/* ================= Application Components ================= */

function MainApp() {
  const {
    blockedReason,
    blockedExplanation,
    isPreview,
    isLoading,
    initialTaskData,
    fullData,
    handleSubmit,
    handleMetadataSubmit,
    handleFatalError,
    isOnboarding,
    taskConfig,
    getAgentRegistration,
  } = useMephistoTask();

  if (!isPreview) {
    useAnnotatorTracker(handleMetadataSubmit, isLoading, 5000);
  }

  if (blockedReason !== null) {
    return (
      <section className="hero is-medium is-danger">
        <div className="hero-body">
          <h2 className="title is-3">{blockedExplanation}</h2>{" "}
        </div>
      </section>
    );
  }
  if (isPreview) {
    return (
      <section className="hero is-medium is-link">
        <div className="hero-body">
          <div className="title is-3">Sample task</div>
          <div className="subtitle is-4">
            <p>
              This is sample introduction about the task.
            </p>
            <p>
              This is sample instruction and consent form. Information sheet:{" "}
              <a
                href={"http://143.244.201.53:9000/infoSheet/"}
                target={"_blank"}
              >
                http://143.244.201.53:9000/infoSheet/
              </a>
              .
            </p>
          </div>
          <ActivityTrackerDisclosure title={"Data we will collect"}>
            <dl>
              <dd>
                - We will record the answers you provide to the questions after
                providing each answer.
              </dd>
              <dd>
                - We will track various online behaviours related to your
                activity on our study’s web page, including how long you spend
                on each task, the mouse clicks you make and the quantity of
                scrolling you do on each page, and so forth.
              </dd>
              <dd>
                - We will collect some demographic information about you to
                enable a picture of our participant group as a whole. When you
                are completing your tasks, for example, we may collect your
                location data, age group, etc.
              </dd>
              <dd>
                - We will also collect information about your digital
                environment like your device version, operating system, browser
                version, IP addresses and cookie data, etc.
              </dd>
            </dl>
          </ActivityTrackerDisclosure>
        </div>
      </section>
    );
  }
  if (isLoading || !initialTaskData) {
    return <LoadingScreen />;
  }
  if (isOnboarding) {
    return <OnboardingComponent onSubmit={handleSubmit} />;
  }

  return (
    <div>
      <ErrorBoundary handleError={handleFatalError}>
        <BaseFrontend
          taskData={initialTaskData}
          fullData={fullData}
          onSubmit={handleSubmit}
          isOnboarding={isOnboarding}
          onError={handleFatalError}
          getAgentRegistration={getAgentRegistration}
        />
      </ErrorBoundary>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <ToastContainer hideProgressBar stacked/>
    <MainApp />
  </React.StrictMode>
);
