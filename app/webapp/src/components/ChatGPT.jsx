import React from "react";

function ChatGPT({getAgentRegistration, fullData}) {
    const getLink = (getAgentRegistration, fullData) => {
        const agentData = getAgentRegistration();
        const params = {
            ...agentData,
            provider: agentData.provider_type,
            app_env: fullData?.app_env,
            app_name: fullData?.app_name,
        };
        const url = process.env.NODE_ENV === "production" ? "https://gpt.dlab-mephisto.com" : "https://staging.gpt.dlab-mephisto.com";
        return `${url}?${new URLSearchParams(params).toString()}`;
    };

    return (
        <iframe
            src={getLink(getAgentRegistration, fullData)}
            width="100%" height="100%" frameBorder="0"></iframe>
    );
}

export {ChatGPT};