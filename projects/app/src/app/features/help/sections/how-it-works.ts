import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">

      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-20">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Simple Contribution</div>
        <h2 class="text-4xl md:text-6xl font-serif mb-6">History in Your Pocket</h2>
        <p class="text-text-muted leading-relaxed text-lg md:text-xl font-light">
          No complex forms. Just chat with our bot to preserve stonemason marks in seconds.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        @for (step of steps; track step.title; let i = $index) {
          <div class="p-8 rounded-2xl bg-surface-alt border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
            <!-- Step Number -->
            <div class="w-10 h-10 rounded-full bg-surface border border-border text-primary flex items-center justify-center font-bold text-sm mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {{ i + 1 }}
            </div>

            <h3 class="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{{ step.title }}</h3>
            <p class="text-text-muted text-sm leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        }
      </div>

      <!-- Desktop Image Showcase -->
      <div class="hidden md:block relative group mb-32">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-surface-alt">
           <img src="assets/images/captureMark.png" alt="StoneMark ChatBot Flow" class="w-full h-auto" />
        </div>
        <div class="text-center mt-6">
           <p class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
             <i class="bi bi-phone"></i> Actual Chat Interface
           </p>
        </div>
      </div>

      <!-- Mobile Image Showcase -->
      <div class="md:hidden -mx-6 space-y-0 overflow-hidden mb-24">
        <div class="w-[115%] -ml-[7.5%]">
          <img src="assets/images/captureMarkMobile1.png" alt="ChatBot Step 1" class="w-full h-auto block" />
        </div>
        <div class="w-[115%] -ml-[7.5%]">
          <img src="assets/images/captureMarkMobile2.png" alt="ChatBot Step 2" class="w-full h-auto block" />
        </div>
        <div class="w-[115%] -ml-[7.5%]">
          <img src="assets/images/captureMarkMobile3.png" alt="ChatBot Step 3" class="w-full h-auto block" />
        </div>

        <div class="text-center mt-8 px-6">
           <p class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
             <i class="bi bi-phone"></i> Actual Chat Interface
           </p>
        </div>
      </div>

      <!-- Detailed Guide -->
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
           <span class="w-12 h-1 bg-primary block mx-auto mb-6 rounded-full opacity-50"></span>
           <h3 class="text-3xl font-serif mb-4">The Complete Journey</h3>
           <p class="text-text-muted">A step-by-step look at how your discovery becomes history.</p>
        </div>

        <div class="relative border-l border-border ml-4 md:ml-0 md:border-l-0 space-y-12">
           @for (step of detailedSteps; track step.title; let i = $index) {
             <div class="md:flex gap-8 items-start group">
               <!-- Number/Marker -->
               <div class="absolute left-[-5px] md:static md:w-24 md:flex-none md:text-right">
                 <span class="hidden md:block text-2xl font-serif font-bold text-border group-hover:text-primary transition-colors">0{{i + 1}}</span>
                 <div class="md:hidden w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface"></div>
               </div>

               <!-- Content -->
               <div class="pl-8 md:pl-0 pt-1 md:pt-2">
                 <h4 class="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{{ step.title }}</h4>
                 <p class="text-text-muted leading-relaxed">{{ step.text }}</p>
               </div>
             </div>
           }
        </div>
      </div>

    </section>
  `
})
export class HowItWorksComponent {
  steps = [
    {
      title: "Connect",
      description: "Start a chat and verify your phone number. Quick, secure, and linked to you."
    },
    {
      title: "Snap & Share",
      description: "Send a photo of the mark. Our AI instantly analyzes it for matches."
    },
    {
      title: "Pin Location",
      description: "Share your location in chat. We find the nearest monument automatically."
    },
    {
      title: "Confirm",
      description: "Review details, add a note if needed, and confirm. History preserved!"
    }
  ];

  detailedSteps = [
    {
      title: "Secure Authentication",
      text: "The bot requests your phone number to securely authenticate you and link every interaction to your registered user profile."
    },
    {
      title: "Initiate Discovery",
      text: "Once verified, the bot presents available actions. Simply choose to 'Propose a Stonemason's Mark' to start."
    },
    {
      title: "Visual Evidence",
      text: "You'll be asked to submit a clear photograph of the mark. This visual record is the core of your contribution."
    },
    {
      title: "AI Processing",
      text: "Upon receiving your image, our intelligent system processes it and attempts to identify similar existing marks in the archive."
    },
    {
      title: "Precise Location",
      text: "Share the geographic location of the mark directly via WhatsApp or Telegram's location-sharing feature."
    },
    {
      title: "Monument Context",
      text: "The bot automatically checks for nearby monuments. If none are found, you'll be asked to manually enter the monument's name."
    },
    {
      title: "Review & Refine",
      text: "You'll get a chance to review all the information. You can confirm it as is or make modifications if needed."
    },
    {
      title: "Add Details",
      text: "Optionally, add descriptive notes about the occurrence—context, condition, or any interesting observations."
    },
    {
      title: "Confirmation",
      text: "Finally, the bot confirms your submission and notifies you that the stonemason mark has been successfully proposed."
    }
  ];
}
