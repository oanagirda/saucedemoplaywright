pipeline {
    agent any
  // Run the pipeline on any agent (mac, linux etc)
    tools {
        nodejs 'Node20'    
    }

  options {
    timestamps() 
    // Show timestamps in Jenkins logs (useful for debugging timing)

    ansiColor('xterm') 
    // Enable colored console output for better readability

    buildDiscarder(logRotator(numToKeepStr: '20')) 
    // Keep only the last 20 builds to avoid disk usage overflow

    timeout(time: 20, unit: 'MINUTES') 
    // Abort the entire pipeline if it runs longer than 20 minutes
  }

  environment {
    TZ = 'Europe/Bucharest'
    // Set timezone for logs to Bucharest time
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        // Pull the source code from the Git repository configured in the Jenkins job
      }
    }

    stage('Node & NPM info') {
      steps {
        sh 'node -v || echo "Node not found"'
        // Print Node.js version or show error if Node is missing

        sh 'npm -v || echo "NPM not found"'
        // Print NPM version or show error if NPM is missing
      }
    }

    stage('Install deps') {
      steps {
        sh 'npm ci'
        // Install project dependencies exactly as defined in package-lock.json
      }
    }

    stage('Install Playwright browsers') {
      steps {
        // On macOS, are NOT needed --with-deps (only needed on Linux)
        sh 'npx playwright install'
        // Install required Playwright browser binaries (Chromium, WebKit, Firefox)
      }
    }

    stage('Run tests') {
      steps {
        // Run all Playwright tests, including setup and multiple projects (if configured)
        sh 'npx playwright test'
      }
      post {
        always {
          // Publish JUnit XML test results to Jenkins Test Report section
          junit 'junit-results.xml'
        }
      }
    }

    stage('Publish HTML report') {
      when { expression { return fileExists('playwright-report/index.html') } }
      // Only run this stage if Playwright HTML report exists

      steps {
        publishHTML(target: [
          allowMissing: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report'
        ])
        // Publish the Playwright HTML report in Jenkins UI
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', onlyIfSuccessful: false, allowEmptyArchive: true
      // Archive all files inside the playwright-report folder (HTML report)

      archiveArtifacts artifacts: 'test-results/**', onlyIfSuccessful: false, allowEmptyArchive: true
      // Archive Playwright test artifacts: videos, traces, screenshots (for debugging)
    }
  }
}