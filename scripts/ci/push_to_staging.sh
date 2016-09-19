echo "Pushing to staging..."

git config user.email $GITHUB_USER_EMAIL
git config user.name $GITHUB_USER_NAME

git checkout staging
git merge develop
git push origin staging