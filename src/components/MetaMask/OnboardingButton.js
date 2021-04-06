import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskOnboarding from '@metamask/onboarding';

// String constants for button text
const ONBOARD_TEXT = 'Install MetaMask';
const CONNECT_TEXT = 'Connect MetaMask';
const CONNECTED_TEXT = 'MetaMask Connected';

/**
 * Defines onboarding button for installing or connecting MetaMask
 * @param {OnboardingButton~updateAccounts} updateAccounts - Callback function to update accounts in parent component
 * @param {OnboardingButton~updateProvider} updateProvider - Callback function to update provider in parent component
 * @returns MetaMask installation/connection button in JSX
 * @description Code taken and modified from https://docs.metamask.io/guide/onboarding-library.html#using-react
 */
export function OnboardingButton({ updateAccounts, updateProvider }) {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    const handleNewAccounts = (newAccounts) => {
      setAccounts(newAccounts);
      updateAccounts(newAccounts);
    };
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)
        .catch(console.error);
      
      window.ethereum.on('accountsChanged', handleNewAccounts);

      /* return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      }; */
    }
  }, [updateAccounts]);

  /**
   * Maintain func ref detecting MetaMask Ethereum provider and updating state
   */
  const handleProvider = useCallback(async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      if (provider === window.ethereum) {
        // Update state in parent component
        updateProvider(new ethers.providers.Web3Provider(provider));
        console.log("handleProvider successfully updated provider");
      } else {
        console.error("handleProvider possibly detected multiple wallets installed");
      }
    } else {
      console.error("handleProvider encountered null provider");
    }
  }, [updateProvider]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      handleProvider();
    }
  }, [handleProvider]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => { setAccounts(newAccounts); });
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <section className="mw-100 pa3 pa4-ns">
      <button
        disabled={isDisabled}
        onClick={onClick}
        className="f5 f4-m f3-l tc no-underline br-pill ba bw1 ph3 pv2 dib black pointer">
        {buttonText}
      </button>
    </section>
  );

} // export function OnboardingButton( ...
