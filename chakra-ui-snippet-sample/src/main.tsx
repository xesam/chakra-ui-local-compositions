import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import { Toaster, toaster } from '@/components/ui/toaster';
import { Button } from '@chakra-ui/react';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider>
            <Toaster />
            <Button
                onClick={() =>
                    toaster.create({
                        title: 'Toast Title',
                        description: 'Toast Description'
                    })
                }
            >
                Click Me
            </Button>
        </Provider>
    </StrictMode>
);
