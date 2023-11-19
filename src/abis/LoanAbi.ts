export const LoanAbi = [
  {
    inputs: [
      {
        internalType: 'contract ILPERC20',
        name: '_borrowerLPToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_collateralFactorAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_baseCreditorsLPAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_baseCreditorsStableAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
    ],
    name: 'AddCreditorLandingInterestEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_creditorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
    ],
    name: 'AddCreditorLiquidityEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_borrowerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
    ],
    name: 'CloseBorrowerLoanEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_borrowerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
    ],
    name: 'CreateBorrowerLoanEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_borrowerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
    ],
    name: 'InitBorrowerLoanEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_borrowerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_borrowerLpAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_borrowerStableAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_creditorLpAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_creditorStableAmount',
        type: 'uint256',
      },
    ],
    name: 'InterestBorrowerLoanEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_borrowerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
    ],
    name: 'RemoveBorrowerLoanEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_creditorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
    ],
    name: 'RemoveCreditorLiquidityEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
    ],
    name: 'SetBorrowerLPTokenEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_baseBorrowersStableAmount',
        type: 'uint256',
      },
    ],
    name: 'SetBorrowersLPDataEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'SetCollateralFactorAmountEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
    ],
    name: 'SetCreditorLPTokenEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'SetCreditorProfitInPercentEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
    ],
    name: 'SetCreditorStableTokenEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'SetLoanExchangerEvent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stableAmount',
        type: 'uint256',
      },
    ],
    name: 'addCreditorLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseBorrowersStableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseCreditorsLPAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseCreditorsStableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'borrowerLPToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'borrowers',
    outputs: [
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'hasLoan',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'lpBalanceInit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stableBalanceInit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blockNumberInit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lpBalanceLast',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stableBalanceLast',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blockNumberLast',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'arrayIndex',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'closeBorrowerLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'creditorLPToken',
    outputs: [
      {
        internalType: 'contract ILPERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'creditorProfitInPercent',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'creditorStableToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'creditors',
    outputs: [
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'lpBalance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stableBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_borrowerAddress',
        type: 'address',
      },
    ],
    name: 'getBorrowerData',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'hasLoan',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'lpBalanceInit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableBalanceInit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blockNumberInit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lpBalanceLast',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableBalanceLast',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blockNumberLast',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'arrayIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct LoanBorrower.Borrower',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCollateralFactorAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_creditorAddress',
        type: 'address',
      },
    ],
    name: 'getCreditorAvailableLpLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_creditorAddress',
        type: 'address',
      },
    ],
    name: 'getCreditorAvailableStableLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_creditorAddress',
        type: 'address',
      },
    ],
    name: 'getCreditorData',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'lpBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stableBalance',
            type: 'uint256',
          },
        ],
        internalType: 'struct LoanCreditor.Creditor',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCreditorProfitInPercent',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCreditorStablePool',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCreditorStableToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLoanExchanger',
    outputs: [
      {
        internalType: 'contract ILoanExchanger',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
    ],
    name: 'initBorrowerLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'interestDepositProfit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lpAmount',
        type: 'uint256',
      },
    ],
    name: 'removeCreditorLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_lpToken',
        type: 'address',
      },
    ],
    name: 'setBorrowerLPToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_baseBorrowersStableAmount',
        type: 'uint256',
      },
    ],
    name: 'setBorrowersLPData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'setCollateralFactorAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILPERC20',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'setCreditorLPToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'setCreditorProfitInPercent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'setCreditorStableToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILoanExchanger',
        name: '_exchangerAddress',
        type: 'address',
      },
    ],
    name: 'setLoanExchanger',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
