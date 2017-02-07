node {
  def project = 'archimedes-01201'
  def appName = 'cltk-app'
  def feSvcName = 'cltk-app-serv'
  def deploymentName = 'cltk-app-dep'
  def appContainerName = 'cltk-app-cont'
  // def imageTag = "us.gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
//  def imageTag = "us.gcr.io/${project}/${appName}:latest"
	def deployArch = "os.linux.x86_64"

  checkout scm

  stage 'Checking out git submodules:'
  sh("git submodule update --init --recursive")

  stage 'Building application:'
  sh("./bin/build_app")
	//sh("npm install")
  //sh("meteor build . --architecture ${deployArch}")

  sh('git describe --dirty --always > build_tag.out')
  def buildTag = readFile('build_tag.out').trim()
  def imageTag = "us.gcr.io/${project}/${appName}:${buildTag}"

  stage 'Building application image:'
  //sh("sudo docker build -t ${imageTag} -f Dockerfile .")
  sh("sudo ./bin/build_image ${imageTag}")

  stage 'Pushing container image to registry:'
  sh("sudo gcloud docker push -- ${imageTag}")

  stage 'Deploying Application:'
	// sh("sudo gcloud container clusters get-credentials cltk-cluster")
	//sh("kubectl apply -f k8s/develop/")
  sh("kubectl set image deployment/${deploymentName} ${appContainerName}=${imageTag}")
	sh("echo http://`kubectl get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
}
