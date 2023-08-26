import React from 'react';

export function Counter() {
    const [count, setCount] = React.useState(0);

    return <div>
        <sp-heading size="M">Count: {count}</sp-heading>
        <sp-button onClick={() => setCount(count => count + 1)}>Increment</sp-button>
    </div>;
}