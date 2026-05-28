export const Premium = () => {
  return (
    <div className="m-10">
      <div class="flex w-full">
        <div class="$$card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 Months</li>
          </ul>
          <button className="btn btn-secondary">Buy Silver</button>
        </div>
        <div class="$$divider $$divider-horizontal">OR</div>
        <div class="$$card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 Months</li>
          </ul>
          <button className="btn btn-primary">Buy Silver</button>
        </div>
      </div>
    </div>
  );
};
