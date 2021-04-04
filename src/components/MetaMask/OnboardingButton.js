import React from 'react';

import MetaMaskOnboarding from '@metamask/onboarding';

// String constants for button text
const ONBOARD_TEXT = 'Install MetaMask';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

/**
 * Defines onboarding button for installing or connecting MetaMask
 * @param {OnboardingButton~updateAccounts} updateAccounts Callback function to update accounts in parent component
 * @returns MetaMask installation/connection button in JSX
 * @description Code taken and modified from https://docs.metamask.io/guide/onboarding-library.html#using-react
 */
export function OnboardingButton({ updateAccounts }) {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        updateAccounts(accounts);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
      updateAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => {
          setAccounts(newAccounts);
          updateAccounts(newAccounts);
        });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <section className="mw-100 pa3 pa4-ns">
      <button
        disabled={isDisabled}
        onClick={onClick}
        className="f5 f4-m f3-l tc grow no-underline br-pill ba bw1 ph3 pv2 dib black pointer">
        {buttonText}
      </button>
    </section>
  );

} // export function OnboardingButton( ...
