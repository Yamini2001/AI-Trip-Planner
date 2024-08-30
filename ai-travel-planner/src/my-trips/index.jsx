import React from 'react';
import { Button } from '../components/ui/Button'; // Correct usage for named export

function Index() {
  return (
    <div>
      <Button variant="outline" className="rounded-full">
        My Trips
      </Button>
    </div>
  );
}

export default Index;
