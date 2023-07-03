import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(1).getBalance()).toBe(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(1).withdraw(2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(1).transfer(2, getBankAccount(1))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1);
    expect(() => bankAccount.transfer(1, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(1).deposit(1).getBalance()).toBe(2);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(1).withdraw(1).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const first = getBankAccount(1);
    const second = getBankAccount(1);
    first.transfer(1, second);
    expect(first.getBalance() + second.getBalance()).toBe(2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect(typeof (await getBankAccount(1).fetchBalance())).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(0);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
