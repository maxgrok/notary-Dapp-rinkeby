const TransactionToastMessages = {
    initialized: {
      message: "Document submitted for notarization",
      secondaryMessage: "Confirm in MetaMask",
      actionHref: "",
      actionText: "",
      variant: "default",
      icon: "InfoOutline"
    },
    started: {
      message: "Document submitted for notarization",
      secondaryMessage: "Confirm in MetaMask",
      actionHref: "",
      actionText: "",
      variant: "default",
      icon: "InfoOutline"
    },
    pending: {
      message: "Processing notarization...",
      secondaryMessage: "This may take a few minutes",
      actionHref: "",
      actionText: "",
      variant: "processing"
    },
     confirmed: {
       message: "Notarization confirming...",
       secondaryMessage: "Your change is in progress",
       actionHref: "",
       actionText: "",
       variant: "processing"
     },
    success: {
      message: "Document Notarized!",
      variant: "success"
    },
    error: {
      message: "Document is not notarized. Notarization failed",
      secondaryMessage: "Could not complete transaction.",
      actionHref: "",
      actionText: "",
      variant: "failure"
    }
  };
  
  export default TransactionToastMessages;
  