/*
 * Copyright (c) Meta Platforms and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function OnboardingComponent({onSubmit}) {
  return (
      <div>
        <Directions>
          This component only renders if you have chosen to assign an onboarding
          qualification for your task. Click the button to move on to the main
          task.
        </Directions>
        <div
            style={{
              width: '100%',
              padding: '1.5rem 0',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
        >
          <button
              className="button is-success"
              style={{width: 'fit-content', marginBottom: '0.65rem'}}
              onClick={() => onSubmit({success: true})}
          >
            Move to Main Task
          </button>
          <button
              className="button is-danger"
              style={{width: 'fit-content'}}
              onClick={() => onSubmit({success: false})}
          >
            Get Blocked
          </button>
        </div>
      </div>
  );
}

function LoadingScreen() {
  return <Directions>Loading...</Directions>;
}

function Directions({children}) {
  return (
      <section className="hero is-light" data-cy="directions-container">
        <div className="hero-body">
          <div className="container">
            <p className="subtitle is-5">{children}</p>
          </div>
        </div>
      </section>
  );
}

function SimpleFrontend({taskData, fullData, isOnboarding, onSubmit, onError, getAgentRegistration}) {

  const [loading, setLoading] = React.useState(false);
  const [prompt, setPrompt] = React.useState(null);
  const [analysis, setAnalysis] = React.useState(null);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setAnswers({...answers, [name]: value});
  };

  const analyze = () => {
    if (!prompt) {
      toast.error("You must enter some words as prompt to analyze.")
      return;
    }
    setLoading(true);
    axios.post("https://dev.api.gpt.dlab-mephisto.com/pygpt", {
        paragraphs: taskData.data.value,
        prompt: prompt
      }, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    }).then(response => {
      setAnalysis(response.data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while calling our service.")
      }
    });
  };

  return (
      <div className="flex gap-4 items-center justify-center flex-wrap" style={{padding: '50px', minHeight: '100vh'}}>
        <div className="h-full min-w-full w-full md:min-w-0 md:w-1/2 xl:w-1/3 flex flex-col p-4 gap-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 100px)'}}>
          {
            taskData.data.value.map((paragraph, index) => 
              <div className="card w-full p-4" key={"paragraph-" + index}>
                {paragraph}
              </div>
            )
          }
        </div>
        <div className='flex flex-1 flex-col items-center justify-center gap-4'>
          <input type="text" placeholder="Enter your prompt here..." className="input input-bordered w-full max-w-xs" onChange={
            (event) => {
              setPrompt(event.target.value);
            }
          } />
          <button className={clsx("btn btn-wide gap-2", loading ? 'loading' : '')} onClick={analyze}>
            {
              !loading && <Icon className="pointer-events-none" icon="tabler:analyze" width="1.5rem" height="1.5rem" />
            }
            Analyze
          </button>
          <div className="p-4 rounded-2xl text-center" style={{backgroundColor: '#f7f4ff'}}>
            <span className={clsx('big-number', analysis && analysis.avg >= 80 ? 'success' : analysis && analysis.avg < 80 ? 'danger' : '')}>
              {analysis ? analysis.avg.toFixed(2) : '--'}/
            </span>
            <span>100</span>
          </div>
          <button className={clsx("btn btn-primary btn-wide gap-2", !analysis || analysis.avg < 80 ? 'btn-disabled' : '')} onClick={() => {
              onSubmit({
                prompt
              });
            }}>
            <Icon icon="formkit:submit" width="1.5rem" height="1.5rem" />
            Submit
          </button>
        </div>
      </div>
  );
}

export {LoadingScreen, SimpleFrontend as BaseFrontend, OnboardingComponent};
