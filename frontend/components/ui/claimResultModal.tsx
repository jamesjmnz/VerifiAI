import React from 'react'
import { Dialog, DialogContent, DialogHeader } from './dialog'
import { Button } from './button'

interface ClaimResultModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const claimResultModal: React.FC<ClaimResultModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
               <div>
                 <h1>Fact Check Details</h1>
                 <Button>Exit</Button>
               </div>
               <div>
                <Button>Fake News</Button>
               </div>
            </DialogHeader>
            <div>
                <div>
                    <p>Extracted Claim</p>
                    <p>COVID-19 vaccines contain microchips for tracking</p>
                </div>

                <div>
                    <p>Source URL</p>
                    <p>https://twitter.com/user/status/123456789</p>
                </div>

                <div>
                    <p>AI Analysis</p>
                    <p>This claim has been thoroughly debunked by multiple health organizations including WHO and CDC. No vaccines contain microchips or tracking devices.</p>
                </div>

            </div>
        </DialogContent>
    </Dialog>
  )
}

export default claimResultModal