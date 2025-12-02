import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '<section class="py-16 px-4">\n' +
    '  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-8 space-y-12">\n' +
    '    <!-- Hero Header -->\n' +
    '    <header class="flex flex-col gap-2">\n' +
    '      <p class="text-xs font-semibold tracking-widest uppercase text-primary">\n' +
    '        Stonemark Legal\n' +
    '      </p>\n' +
    '      <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight">\n' +
    '        Cookie Policy\n' +
    '      </h1>\n' +
    '      <p class="text-base text-text-muted">\n' +
    '        Last updated: November 19, 2025\n' +
    '      </p>\n' +
    '    </header>\n' +
    '\n' +
    '    <!-- Sections Grid -->\n' +
    '    <article class="flex flex-col gap-6" aria-label="Cookie Policy sections">\n' +
    '\n' +
    '      <!-- Introduction -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Introduction\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          This Cookie Policy explains how Stonemark ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website and use our services. This policy should be read alongside our Privacy Policy and Terms of Service.\n' +
    '        </p>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          By using Stonemark, you consent to the use of cookies in accordance with this policy. If you do not agree to our use of cookies, you should adjust your browser settings accordingly or refrain from using our platform.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- What Are Cookies -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            What Are Cookies?\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.\n' +
    '        </p>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          Cookies can be "session cookies" (temporary, deleted when you close your browser) or "persistent cookies" (remain on your device for a set period or until manually deleted).\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Types of Cookies We Use -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Types of Cookies We Use\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- Essential Cookies -->\n' +
    '        <div class="mb-6">\n' +
    '          <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">\n' +
    '            1. Essential Cookies\n' +
    '          </h3>\n' +
    '          <p class="text-text-muted leading-relaxed mb-3">\n' +
    '            These cookies are strictly necessary for the operation of our platform. They enable core functionality such as security, authentication, and accessibility features.\n' +
    '          </p>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <p class="text-sm font-semibold text-text mb-2">Examples:</p>\n' +
    '            <ul class="text-sm text-text-muted space-y-1 pl-4">\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Authentication tokens to keep you logged in</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Session management and security verification</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Load balancing to ensure platform stability</span>\n' +
    '              </li>\n' +
    '            </ul>\n' +
    '            <p class="text-xs text-text-muted mt-3 italic">\n' +
    '              These cookies cannot be disabled as they are essential for the platform to function properly.\n' +
    '            </p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- Functional Cookies -->\n' +
    '        <div class="mb-6">\n' +
    '          <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">\n' +
    '            2. Functional Cookies\n' +
    '          </h3>\n' +
    '          <p class="text-text-muted leading-relaxed mb-3">\n' +
    '            These cookies allow us to remember your preferences and choices to provide you with a more personalized experience.\n' +
    '          </p>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <p class="text-sm font-semibold text-text mb-2">Examples:</p>\n' +
    '            <ul class="text-sm text-text-muted space-y-1 pl-4">\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Language and region preferences</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Display settings and accessibility options</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Recently viewed monuments and marks</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Bookmarked content and saved searches</span>\n' +
    '              </li>\n' +
    '            </ul>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- Analytics Cookies -->\n' +
    '        <div class="mb-6">\n' +
    '          <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">\n' +
    '            3. Analytics Cookies\n' +
    '          </h3>\n' +
    '          <p class="text-text-muted leading-relaxed mb-3">\n' +
    '            These cookies help us understand how visitors interact with our platform by collecting anonymous information about usage patterns and performance.\n' +
    '          </p>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <p class="text-sm font-semibold text-text mb-2">Examples:</p>\n' +
    '            <ul class="text-sm text-text-muted space-y-1 pl-4">\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Page views, session duration, and bounce rates</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Popular features and most-viewed content</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Traffic sources and user journeys</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Error tracking and performance monitoring</span>\n' +
    '              </li>\n' +
    '            </ul>\n' +
    '            <p class="text-xs text-text-muted mt-3">\n' +
    '              We use services like Google Analytics to collect this data. All analytics data is anonymized and aggregated.\n' +
    '            </p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- Marketing Cookies -->\n' +
    '        <div>\n' +
    '          <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">\n' +
    '            4. Marketing Cookies\n' +
    '          </h3>\n' +
    '          <p class="text-text-muted leading-relaxed mb-3">\n' +
    '            These cookies are used to deliver relevant advertisements and measure the effectiveness of marketing campaigns.\n' +
    '          </p>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <p class="text-sm font-semibold text-text mb-2">Examples:</p>\n' +
    '            <ul class="text-sm text-text-muted space-y-1 pl-4">\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Personalized content recommendations</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Social media integration and sharing features</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>\n' +
    '                <span>Advertisement performance tracking</span>\n' +
    '              </li>\n' +
    '            </ul>\n' +
    '            <p class="text-xs text-text-muted mt-3">\n' +
    '              You can opt out of marketing cookies through your cookie preferences.\n' +
    '            </p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Third-Party Cookies -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Third-Party Cookies\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          In addition to our own cookies, we may use third-party services that set their own cookies. These include:\n' +
    '        </p>\n' +
    '        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2 flex items-center gap-2">\n' +
    '              <i class="bi bi-bar-chart text-primary"></i>\n' +
    '              Google Analytics\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted">For website analytics and performance monitoring</p>\n' +
    '          </div>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2 flex items-center gap-2">\n' +
    '              <i class="bi bi-map text-primary"></i>\n' +
    '              Mapping Services\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted">For interactive maps and location features</p>\n' +
    '          </div>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2 flex items-center gap-2">\n' +
    '              <i class="bi bi-share text-primary"></i>\n' +
    '              Social Media Platforms\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted">For social sharing and authentication</p>\n' +
    '          </div>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2 flex items-center gap-2">\n' +
    '              <i class="bi bi-shield-check text-primary"></i>\n' +
    '              Security Services\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted">For fraud prevention and security monitoring</p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <p class="text-sm text-text-muted mt-4 italic">\n' +
    '          Please note that we do not control these third-party cookies. We recommend reviewing the privacy policies of these services for more information.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Managing Your Cookie Preferences -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <i class="bi bi-sliders text-primary text-2xl"></i>\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Managing Your Cookie Preferences\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          You have the right to control which cookies are set on your device. You can manage your preferences in several ways:\n' +
    '        </p>\n' +
    '\n' +
    '        <div class="space-y-4">\n' +
    '          <!-- Browser Settings -->\n' +
    '          <div class="bg-surface rounded-xl p-5 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-3 flex items-center gap-2">\n' +
    '              <i class="bi bi-browser-chrome text-primary"></i>\n' +
    '              Browser Settings\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted mb-3">\n' +
    '              Most browsers allow you to control cookies through their settings. You can typically:\n' +
    '            </p>\n' +
    '            <ul class="text-sm text-text-muted space-y-2 pl-4">\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <span class="text-primary">•</span>\n' +
    '                <span>View cookies stored on your device</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <span class="text-primary">•</span>\n' +
    '                <span>Delete existing cookies</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <span class="text-primary">•</span>\n' +
    '                <span>Block all cookies or specific types</span>\n' +
    '              </li>\n' +
    '              <li class="flex items-start gap-2">\n' +
    '                <span class="text-primary">•</span>\n' +
    '                <span>Set preferences for specific websites</span>\n' +
    '              </li>\n' +
    '            </ul>\n' +
    '          </div>\n' +
    '\n' +
    '          <!-- Cookie Banner -->\n' +
    '          <div class="bg-surface rounded-xl p-5 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-3 flex items-center gap-2">\n' +
    '              <i class="bi bi-toggles text-primary"></i>\n' +
    '              Cookie Consent Banner\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted">\n' +
    '              When you first visit Stonemark, you\'ll see a cookie consent banner. You can accept all cookies, reject non-essential cookies, or customize your preferences. You can change these settings at any time through the cookie preferences link in the footer.\n' +
    '            </p>\n' +
    '          </div>\n' +
    '\n' +
    '          <!-- Opt-Out Links -->\n' +
    '          <div class="bg-surface rounded-xl p-5 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-3 flex items-center gap-2">\n' +
    '              <i class="bi bi-box-arrow-right text-primary"></i>\n' +
    '              Third-Party Opt-Out\n' +
    '            </h4>\n' +
    '            <p class="text-sm text-text-muted mb-2">\n' +
    '              For third-party analytics and advertising cookies, you can opt out through:\n' +
    '            </p>\n' +
    '            <ul class="text-sm space-y-1">\n' +
    '              <li>\n' +
    '                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener"\n' +
    '                   class="text-primary font-semibold hover:underline">\n' +
    '                  Google Analytics Opt-Out\n' +
    '                </a>\n' +
    '              </li>\n' +
    '              <li>\n' +
    '                <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener"\n' +
    '                   class="text-primary font-semibold hover:underline">\n' +
    '                  Your Online Choices (EU)\n' +
    '                </a>\n' +
    '              </li>\n' +
    '              <li>\n' +
    '                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener"\n' +
    '                   class="text-primary font-semibold hover:underline">\n' +
    '                  Network Advertising Initiative\n' +
    '                </a>\n' +
    '              </li>\n' +
    '            </ul>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-xl">\n' +
    '          <p class="text-sm text-text-muted">\n' +
    '            <strong class="text-primary">Important:</strong> Blocking certain cookies may affect your experience on Stonemark. Some features may not work properly or may be unavailable if you disable essential or functional cookies.\n' +
    '          </p>\n' +
    '        </div>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Cookie Retention -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Cookie Retention Periods\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          Different cookies are retained for different periods:\n' +
    '        </p>\n' +
    '        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2">Session Cookies</h4>\n' +
    '            <p class="text-sm text-text-muted">Deleted when you close your browser</p>\n' +
    '          </div>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2">Persistent Cookies</h4>\n' +
    '            <p class="text-sm text-text-muted">Remain for 30 days to 2 years depending on type</p>\n' +
    '          </div>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2">Authentication Cookies</h4>\n' +
    '            <p class="text-sm text-text-muted">Retained for up to 30 days or until logout</p>\n' +
    '          </div>\n' +
    '          <div class="bg-surface rounded-xl p-4 border border-border">\n' +
    '            <h4 class="font-bold text-text mb-2">Analytics Cookies</h4>\n' +
    '            <p class="text-sm text-text-muted">Typically retained for 24 months</p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Updates to This Policy -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Updates to This Policy\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We will notify you of any material changes by posting the updated policy on this page with a new "Last updated" date. We encourage you to review this policy periodically to stay informed about how we use cookies.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Contact -->\n' +
    '      <section class="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 lg:p-8 shadow-lg">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Questions About Cookies?\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          If you have questions about how we use cookies or would like more information about your privacy rights, please don\'t hesitate to contact us.\n' +
    '        </p>\n' +
    '        <div class="flex flex-wrap gap-4">\n' +
    '          <a routerLink="/contact"\n' +
    '             class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">\n' +
    '            <i class="bi bi-chat-dots"></i>\n' +
    '            Contact Us\n' +
    '          </a>\n' +
    '          <a routerLink="/privacy-policy"\n' +
    '             class="inline-flex items-center gap-2 px-6 py-3 bg-surface border-2 border-border text-text rounded-xl font-semibold hover:border-primary transition-all">\n' +
    '            <i class="bi bi-shield-check"></i>\n' +
    '            Privacy Policy\n' +
    '          </a>\n' +
    '        </div>\n' +
    '      </section>\n' +
    '    </article>\n' +
    '  </div>\n' +
    '</section>\n'
})
export class CookiesPolicyComponent {}
