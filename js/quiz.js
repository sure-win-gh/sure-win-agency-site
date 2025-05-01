document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    const steps = document.querySelectorAll('.quiz-step');
    const progressDots = document.querySelectorAll('.progress-dot');
    const prevButton = document.querySelector('.quiz-prev');
    const nextButton = document.querySelector('.quiz-next');
    const resultsSection = document.querySelector('.quiz-results');
    const recommendedService = document.querySelector('.recommended-service');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    const answers = {};
    const webhookUrl = 'https://hook.eu2.make.com/r81y15i58o0j4fisakgl2d1oc1j201n0';

    // Initialize the next button as disabled
    nextButton.disabled = true;

    // Handle option selection
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const step = this.closest('.quiz-step');
            const stepNumber = step.dataset.step;
            const stepOptions = step.querySelectorAll('.quiz-option');
            
            // Remove selected class from all options in this step
            stepOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store the answer
            answers[stepNumber] = this.dataset.value;
            
            // Enable next button if an option is selected
            nextButton.disabled = false;
        });
    });

    // Handle next button click
    nextButton.addEventListener('click', function() {
        // If on the last step (contact form), show results
        if (currentStep === totalSteps) {
            // Validate form on last step
            const form = document.querySelector('.quiz-form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            showResults();
            return;
        }

        // Validate current step
        if (currentStep < totalSteps && !answers[currentStep]) {
            alert('Please select an option before proceeding.');
            return;
        }

        // Move to next step
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep].classList.add('active');
        
        // Update progress dots
        progressDots[currentStep - 1].classList.remove('active');
        progressDots[currentStep].classList.add('active');
        
        // Show/hide navigation buttons
        prevButton.style.display = 'block';
        if (currentStep === totalSteps - 1) {
            nextButton.textContent = 'See Results';
        }
        
        currentStep++;
        
        // Disable next button until an option is selected
        nextButton.disabled = true;
    });

    // Handle previous button click
    prevButton.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            
            // Update steps
            steps[currentStep].classList.remove('active');
            steps[currentStep - 1].classList.add('active');
            
            // Update progress dots
            progressDots[currentStep].classList.remove('active');
            progressDots[currentStep - 1].classList.add('active');
            
            // Update navigation buttons
            if (currentStep === 1) {
                prevButton.style.display = 'none';
            }
            if (currentStep === totalSteps - 1) {
                nextButton.textContent = 'Next';
            }
            
            // Hide results if they were shown
            resultsSection.style.display = 'none';
            
            // Re-enable next button if there's a selected option
            nextButton.disabled = !answers[currentStep];
        }
    });

    // Show results based on answers
    function showResults() {
        // Hide all steps
        steps.forEach(step => step.style.display = 'none');
        
        // Hide navigation
        document.querySelector('.quiz-navigation').style.display = 'none';
        
        // Determine recommended service based on answers
        let recommendation = determineRecommendation();
        
        // Show results
        recommendedService.innerHTML = recommendation;
        resultsSection.style.display = 'block';
        
        // Send data to webhook
        sendDataToWebhook();
    }
    
    // Send quiz data to webhook
    function sendDataToWebhook() {
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const phone = document.getElementById('phone').value;
        
        // Prepare data for webhook
        const webhookData = {
            businessType: getBusinessTypeText(answers['1']),
            marketingChallenge: getChallengeText(answers['2']),
            currentContent: getContentStatusText(answers['3']),
            handsOnPreference: getHandsOnText(answers['4']),
            investment: getInvestmentText(answers['5']),
            contactInfo: {
                name: name,
                email: email,
                company: company,
                phone: phone
            },
            timestamp: new Date().toISOString()
        };
        
        // Send data to webhook
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Data sent to webhook successfully');
        })
        .catch(error => {
            console.error('Error sending data to webhook:', error);
        });
    }
    
    // Helper function to get business type text
    function getBusinessTypeText(businessType) {
        switch(businessType) {
            case 'hospitality': return 'Hospitality Business';
            case 'retail': return 'Retail Business';
            case 'service': return 'Service Business';
            case 'other': return 'Other Business';
            default: return 'Unknown';
        }
    }
    
    // Helper function to get challenge text
    function getChallengeText(challenge) {
        switch(challenge) {
            case 'content-ideas': return 'Need Content Ideas';
            case 'no-results': return 'No Results from Posts';
            case 'no-time': return 'No Time for Social Media';
            case 'need-customers': return 'Need More Customers';
            case 'automation': return 'Need Automation Help';
            default: return 'Unknown';
        }
    }
    
    // Helper function to get content status text
    function getContentStatusText(status) {
        switch(status) {
            case 'yes': return 'Creating Content Regularly';
            case 'no': return 'Not Creating Content';
            case 'sometimes': return 'Creating Content Sometimes';
            default: return 'Unknown';
        }
    }
    
    // Helper function to get hands-on preference text
    function getHandsOnText(preference) {
        switch(preference) {
            case 'hands-on': return 'Want to Manage with Help';
            case 'hands-off': return 'Want Complete Management';
            default: return 'Unknown';
        }
    }
    
    // Helper function to get investment text
    function getInvestmentText(investment) {
        switch(investment) {
            case 'starter': return '£250–£500/month';
            case 'growth': return '£500–£1000/month';
            case 'scale': return '£1000+/month';
            default: return 'Unknown';
        }
    }

    // Determine recommended service based on answers
    function determineRecommendation() {
        const businessType = answers['1'];
        const challenge = answers['2'];
        const currentContent = answers['3'];
        const handsOn = answers['4'];
        const investment = answers['5'];
        
        let recommendation = '<div class="recommendation-details">';
        
        // Determine primary recommendation based on answers
        let serviceType = '';
        let explanation = '';
        
        if (handsOn === 'hands-off') {
            serviceType = 'Done-For-You Social Media Management';
            explanation = `Based on your answers, we recommend our Done-For-You Social Media Management because you want to free up your time and focus on running your ${getBusinessTypeText(businessType).toLowerCase()}.`;
        } else if (handsOn === 'hands-on') {
            if (challenge === 'content-ideas') {
                serviceType = 'Initial Audit & Coaching Call + Content Creation Support';
                explanation = "We'll help you develop a content strategy and provide ongoing support for your content creation.";
            } else if (challenge === 'no-results') {
                serviceType = 'Social Media Strategy Coaching Calls';
                explanation = "We'll analyze your current strategy and help you improve your content performance.";
            } else {
                serviceType = 'Done-With-You Coaching Services';
                explanation = "We'll guide you through the process while you maintain control of your marketing.";
            }
        }
        
        // Add specific recommendations based on challenges
        if (challenge === 'need-customers') {
            serviceType = 'Facebook Ads Management';
            explanation = "We'll help you reach more potential customers through targeted Facebook advertising.";
        } else if (challenge === 'automation') {
            serviceType = 'Automation Setup & Management';
            explanation = "We'll help you streamline your marketing processes with the right automation tools.";
        }
        
        // Add service type and explanation
        recommendation += `<h4>${serviceType}</h4>`;
        recommendation += `<p>${explanation}</p>`;
        
        // Add investment level
        recommendation += `<p>Investment Level: ${getInvestmentText(investment)}</p>`;
        
        // Add personalized message based on business type
        let businessMessage = '';
        switch(businessType) {
            case 'hospitality':
                businessMessage = "We understand the unique challenges of marketing in the hospitality industry and will tailor our approach to help you attract more customers.";
                break;
            case 'retail':
                businessMessage = "We'll help you showcase your products and drive both online and in-store traffic.";
                break;
            case 'service':
                businessMessage = "We'll focus on building your professional reputation and generating quality leads for your services.";
                break;
            default:
                businessMessage = "We'll create a customized strategy that fits your specific business needs.";
        }
        recommendation += `<p class="business-message">${businessMessage}</p>`;
        
        recommendation += '</div>';
        
        return recommendation;
    }
}); 