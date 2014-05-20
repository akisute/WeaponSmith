//
//  MainViewController.m
//  WeaponSmith
//
//  Created by Ono Masashi on 2014/05/20.
//  Copyright (c) 2014年 akisute. All rights reserved.
//

#import "MainViewController.h"
#import "APIClient.h"

@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [[[APIClient sharedClient] getNewWeaponAsync] continueWithExecutor:[BFExecutor mainThreadExecutor] withBlock:^id(BFTask *task) {
        if (task.error) {
            NSLog(@"[ERROR] %@", task.error);
            return nil;
        }
        NSLog(@"[SUCCEEDED] %@", task.result);
        return task.result;
    }];
}

@end
